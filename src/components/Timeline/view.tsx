import React, { useLayoutEffect } from 'react';

import { Observable, BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { takeUntil, map, switchMap } from 'rxjs/operators';
import styled from '@emotion/styled';

// import filter from 'rxjs/operators/filter';

import { PassiveEvent } from './constants';
import {
  getElementDirection,
  getElementDirectionFrom,
  getElementIndex,
  getElementType,
} from './utils';

// TOOD: Pass number of columns
// TODO: Pass colours
// TODO: Pass highlight colour
// TODO: Make grid layout, template an inline thing

export const TimelineWrapper: React.ElementType = styled.div`
  display: grid;
  border: 0;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  > div {
    display: grid;
    grid-template-columns: 150px repeat(12, 1fr);
    background-color: #fff;
    &.row {
      grid-template-columns: 150px 1fr;
      > ul {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-gap: 8px 0;
        padding: 0;
        margin: 0;
      }
    }
  }
`;

export function ReactiveTimeline() {
  // Subject we use for each line item
  const observableItemSubject$: BehaviorSubject<null | EventResult> = new BehaviorSubject(
    null
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
    // Our observable is a stream, that starts
    // with click and hold on the element, continues with the move
    // of the mouse, and stops when the hold is released.
    // In RxJs the code looks simple as.
    const resizeTimelineItem: Subscription = startMove$
      .pipe(
        // Get original clientX position
        map(({ clientX, target }: MouseEvent) => ({
          startClientX: clientX as number,
          target: target as HTMLElement,
        })),
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
      .subscribe(observableItemSubject$.next);
    // Feed it to the subjects
    // Unsubscribe after un-mount
    return function cleanup() {
      resizeTimelineItem.unsubscribe();
    };
  });
  return (
    <TimelineWrapper>
      <div>
        <span />
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>
      <div className="row">
        <div>First column</div>
        <ul>
          <li
            style={{
              gridColumn: '1 / span 11',
            }}
          >
            Even longer project
          </li>
        </ul>
      </div>
    </TimelineWrapper>
  );
}

export default ReactiveTimeline;
