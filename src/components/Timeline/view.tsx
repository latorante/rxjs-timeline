import React, { useLayoutEffect, useState } from 'react';

import { Observable, Subject, fromEvent, Subscription } from 'rxjs';
import { takeUntil, map, switchMap } from 'rxjs/operators';

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
import { mapMouseEventIntoPartialEvent } from '../../reactive/utils';

import { calculateColumnSizing } from '../TimelineElements/utils';

export function ReactiveTimeline() {
  /**
   * Initial state
   */
  const [timelineRows, setTimelineRows] = useState([[1, 3], [2, 5], [5, 6]]);

  /**
   * Subject that gets told about element size changes
   */
  const observableItemResultSubject$: Subject<
    ColumnSizingResult
  > = new Subject();
  observableItemResultSubject$.subscribe(
    ({ columnSizing, index }: ColumnSizingResult): void => {
      const data = [...timelineRows];
      data[index] = columnSizing;
      setTimelineRows(data);
    }
  );

  // Attach events on render
  useLayoutEffect(() => {
    // Capture move of the mouse, across the document
    const move$: Observable<Event> = fromEvent(
      document,
      'mousemove',
      PassiveEvent
    );
    // Start moving only on the handlebar
    const startMove$: Observable<Event> = fromEvent(
      document.querySelectorAll('.handle, .item'),
      'mousedown',
      PassiveEvent
    );
    // Stop move anywhere in the document
    const stopMove$: Observable<Event> = fromEvent(
      document,
      'mouseup',
      PassiveEvent
    );

    /**
     * The size of this one column will let us easily calculate
     * the steps opon dragging / resizing
     */
    const elementSizer: HTMLElement | null = document.getElementById(
      'resizer-box'
    );
    const elementSizerSize: number = elementSizer
      ? elementSizer.offsetWidth
      : 0;

    /**
     * Our observable is a stream, that starts
     * with click and hold on the element, continues with the move
     * of the mouse, and stops when the hold is released.
     * In RxJs the code looks simple as.
     */
    const resizeTimelineItem: Subscription = startMove$
      .pipe(
        // Get original clientX position
        map(mapMouseEventIntoPartialEvent),
        // Merge when we stop moving, but switching into a new
        // observable, killing the previous one
        switchMap(({ startClientX, target }) =>
          move$.pipe(
            // We only care about where it originated from
            // and where it went on the horizontal plane
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
            takeUntil(stopMove$)
          )
        )
      )
      .subscribe((event: EventResult) => {
        /**
         * Component Did Mount, so get initial width of
         * Filter subject only to this specific index line,
         * so we don't get events that are for row number 1,
         * in every single row. Also, useMemo saves this, so it doesn't create
         * infinite loop of subscribers
         *
         * Get the latest event from this observable stream
         * and pass down initial values in "virtual event"
         */
        const eventIndex = event.index;
        const data = [...timelineRows];

        if (!data[eventIndex]) {
          return;
        }

        const oldColumnStart = data[eventIndex][0];
        const oldColumnSpan = data[eventIndex][1];

        /**
         * Calculate latest column size
         */
        const [columnStart, columnsSpan] = calculateColumnSizing(
          event,
          elementSizerSize,
          12,
          data[eventIndex] as ColumnSizing
        );
        if (oldColumnStart !== columnStart || oldColumnSpan !== columnsSpan) {
          observableItemResultSubject$.next({
            columnSizing: [columnStart, columnsSpan],
            index: eventIndex,
          } as ColumnSizingResult);
        }
      });

    /**
     * Feed it to the subjects Unsubscribe after un-mount
     */
    return function cleanup() {
      resizeTimelineItem.unsubscribe();
    };
  }, [observableItemResultSubject$, timelineRows]);

  console.log('I repaint');

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
