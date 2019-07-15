import React, { useLayoutEffect, useState } from 'react';

import { Observable, Subject, fromEvent, Subscription } from 'rxjs';
import { takeUntil, map, switchMap, filter } from 'rxjs/operators';

import { PassiveEvent } from './constants';
import {
  getElementDirection,
  getElementDirectionFrom,
  getElementIndex,
  getElementType,
} from './utils';
import {
  Wrapper,
  Row,
  Columns,
  FirstColumn,
  Column,
  ReactiveColumnWrapper,
} from '../TimelineElements';

import { EventResult } from '../../global';
import {
  ColumnSizing,
  ColumnSizingResult,
} from '../TimelineElements/declarations';
import {
  mapMouseEventIntoPartialEvent,
  filterMouseEvents,
} from '../../reactive/utils';

import { calculateColumnSizing } from '../TimelineElements/utils';

/**
 * The actual timeline container is a functional
 * component that uses hooks for component did mount side effects.
 */
export function ReactiveTimeline() {
  /**
   * Initial state
   */
  const [timelineRows, setTimelineRows] = useState([[1, 3], [2, 5], [5, 6]]);
  const factor = 2;

  /**
   * Subject that gets told about element size changes
   */
  const observableItemResultSubject$: Subject<
    ColumnSizingResult
  > = new Subject();
  /**
   * And the element sizing updates into the state / callback
   */
  observableItemResultSubject$.subscribe(
    ({ columnSizing, index }: ColumnSizingResult): void => {
      setTimelineRows(prevState => {
        const data = [...prevState];
        data[index] = columnSizing;
        return data;
      });
    }
  );

  /**
   * After the dom is rendered we attach event listeners to our elements.
   * Notice we don't use `useEffect` but `useLayoutEffect` to make that work.
   */
  useLayoutEffect(() => {
    /**
     * Observable Stream of mouseDown events on the given elements.
     * This captures when user clicks on the element, either on the
     * handle to resize the element, or on the element itself to drag it.
     */
    const startMove$: Observable<Event> = fromEvent(
      document.querySelectorAll('.handle, .item'),
      'mousedown',
      PassiveEvent
    );
    /**
     * Observable Stream of mouseMove events on the document.
     * This captures the movement of the mest from left to right
     * (we omit up and down changes)
     */
    const move$: Observable<Event> = fromEvent(
      document,
      'mousemove',
      PassiveEvent
    );
    /**
     * Observable Stream of mouseUp. This is used to stop the stream
     * after user has finished the click and drag / resize action.
     */
    const stopMove$: Observable<Event> = fromEvent(
      document,
      'mouseup',
      PassiveEvent
    );

    /**
     * The size of this one column will let us easily calculate
     * the steps upon dragging / resizing.
     */
    const block: HTMLElement | null = document.getElementById('resizer-box');
    const blockSize: number = block ? block.offsetWidth : 0;

    /**
     * Our observable is a stream, that starts
     * with click and hold on the element, continues with the move
     * of the mouse, and stops when the hold is released.
     * In RxJs the code looks simple as.
     */
    const resizeTimelineItem$: Subscription = startMove$
      .pipe(
        /**
         * Capture the original horizontal plane (X) postion
         * stored as startClientX
         */
        map(mapMouseEventIntoPartialEvent),
        /**
         * Switch into a new observable once the user
         * moves his mouse on the horizontal plane. While we do
         * so, we extract the startClientX and element that
         * drag / resize is happening on.
         */
        switchMap(({ startClientX, target }) =>
          move$.pipe(
            /**
             * At this point, we take the event as it is and transform it into an
             * EventResult which has all the information needed to calculate next
             * position and size.
             *
             * Please note the type (if it's resize or drag), the index (from the array to easily
             * target the element when updating), the direction we grabbed from and
             * direction of origin is parsed from the HTML element as a data-attribute.
             */
            map(
              ({ clientX }: MouseEvent): EventResult => ({
                startClientX,
                endClientX: clientX,
                target,
                type: getElementType(target),
                index: getElementIndex(target),
                direction: getElementDirection(startClientX, clientX),
                directionFrom: getElementDirectionFrom(target),
              })
            ),
            /**
             * We filter the events and only do the "heavy" computations if the
             * lenght of the move is within the given factor.
             *
             * For example, with a factor of 2.
             *
             * $factor = 2;
             *
             * Which ends up being 1/$factor of the
             * size of one column, if we move on a horizantel plane by either
             * dragging or resizing more or equal to a 1/$factor of the elment's size
             * we send the event down the pipe. If not, it's filtered out.
             *
             */
            filter(filterMouseEvents(blockSize, factor)),
            /**
             * We stop after the use releases the mouse.
             */
            takeUntil(stopMove$)
          )
        )
      )
      /**
       * We subscribe to the stream knowing we will get only important
       * changes.
       */
      .subscribe((event: EventResult) => {
        /**
         * The index of the element in the data source for easy targeting.
         */
        const eventIndex = event.index;
        /**
         * A copy of the array
         */
        const timelineRowsReffed = [...timelineRows];
        /**
         * If element doesn't exist in the array, we might
         * as well call it quits.
         */
        if (!timelineRowsReffed[eventIndex]) {
          return;
        }

        /**
         * We need the old column sizing as if it has not changed,
         * ther is no need to update the Subject with next value and cause
         * a re-render.
         */
        const [oldColumnStart, oldColumnSpan] = timelineRowsReffed[eventIndex];

        /**
         * Calculate latest column size
         */
        const [columnStart, columnsSpan] = calculateColumnSizing(
          event,
          blockSize,
          12,
          timelineRowsReffed[eventIndex] as ColumnSizing
        );

        /**
         * If the column size has changed in at least one aspect of it,
         * we update the Subject with a next value, which triggers a state
         * update and re-render.
         */
        if (oldColumnStart !== columnStart || oldColumnSpan !== columnsSpan) {
          observableItemResultSubject$.next({
            columnSizing: [columnStart, columnsSpan],
            index: eventIndex,
          } as ColumnSizingResult);
        }
      });

    /**
     * Unsubscribe after un-mount.
     */
    return function cleanup() {
      resizeTimelineItem$.unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      <Row className="header">
        <FirstColumn />
        <Columns>
          <Column id="resizer-box">Jan</Column>
          <Column>Feb</Column>
          <Column>Mar</Column>
          <Column>Apr</Column>
          <Column>May</Column>
          <Column>Jun</Column>
          <Column>Jul</Column>
          <Column>Aug</Column>
          <Column>Sep</Column>
          <Column>Oct</Column>
          <Column>Nov</Column>
          <Column>Dec</Column>
        </Columns>
      </Row>
      {timelineRows.map((element: ColumnSizing, index: number) => (
        <Row key={`row-element-${index}`}>
          <FirstColumn>First column</FirstColumn>
          <ReactiveColumnWrapper
            columns={12}
            key={`timeline-item-${index}`}
            i={index}
            columnSizing={element}
          />
        </Row>
      ))}
    </Wrapper>
  );
}

export default ReactiveTimeline;
