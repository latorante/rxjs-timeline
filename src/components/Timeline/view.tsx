import React, { useLayoutEffect } from 'react';

import {
  Observable,
  BehaviorSubject,
  Subject,
  fromEvent,
  Subscription,
} from 'rxjs';
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

import { mapMouseEventIntoPartialEvent } from '../../reactive/utils';

export function ReactiveTimeline() {
  // Subject we use for each line item
  const observableItemSubject$: BehaviorSubject<null | EventResult> = new BehaviorSubject(
    null
  );
  const observableItemResultSubject$: Subject<null> = new Subject();
  if (observableItemResultSubject$) {
  }

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
      .subscribe((event: EventResult) => observableItemSubject$.next(event));
    /**
     * Feed it to the subjects Unsubscribe after un-mount
     */
    return function cleanup() {
      resizeTimelineItem.unsubscribe();
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
      <Row>
        <FirstColumn>First column</FirstColumn>
        <ReactiveColumnWrapper
          columns={12}
          key={`timeline-item-0`}
          i={0}
          observableItemSubject$={observableItemSubject$}
          columnSizing={[12, 1]}
        />
      </Row>
      <Row>
        <FirstColumn>First column</FirstColumn>
        <ReactiveColumnWrapper
          columns={12}
          key={`timeline-item-1`}
          i={1}
          observableItemSubject$={observableItemSubject$}
          columnSizing={[1, 2]}
        />
      </Row>
    </Wrapper>
  );
}

export default ReactiveTimeline;
