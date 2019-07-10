import React, { useLayoutEffect } from 'react';

import { Observable, BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { takeUntil, map, switchMap } from 'rxjs/operators';
// import filter from 'rxjs/operators/filter';

import { PASSIVE_EVENT } from './constants';
import {
  getElementDirection,
  getElementDirectionFrom,
  getElementIndex,
  getElementType,
} from './utils';

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
      PASSIVE_EVENT
    );
    // Start moving only on the handlebar
    const startMove$: Observable<Event> = fromEvent(
      document.querySelectorAll('.handle, .item'),
      'mousedown',
      PASSIVE_EVENT
    );
    // Stop move anywhere in the doucment
    const stopMove$: Observable<Event> = fromEvent(
      document,
      'mouseup',
      PASSIVE_EVENT
    );
    // Our observable is a stream, that starts
    // with click and hold on the element, continues with the move
    // of the mouse, and stops when the hold is released.
    // In RxJs the code looks simple as.
    const resizeTimelineItem: Subscription = startMove$
      .pipe(
        // Get original cliencdX position
        map(({ clientX, target }: MouseEvent) => ({
          startClientX: clientX as number,
          target: target as HTMLElement,
        })),
        // Merge when we stop moving, but switching into a new
        // observable, killing the prvious one
        switchMap(({ startClientX, target }) =>
          move$.pipe(
            // We only care about where it originated from
            // and where it went on the horizontal plane
            map(
              ({ clientX }: MouseEvent): EventResult => ({
                startClientX,
                endClientX: clientX,
                target: target,
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
    // Unsubscribe after unmount
    return function cleanup() {
      resizeTimelineItem.unsubscribe();
    };
  });
  return (
    <div className="gantt">
      <div className="gantt__row gantt__row--months">
        <div className="gantt__row-first"></div>
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
      <div className="gantt__row gantt__row--lines" data-month="5">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span className="marker"></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="gantt__row">
        <div className="gantt__row-first">Barnard Posselt</div>
        <ul className="gantt__row-bars">
          <li
            style={{
              gridColumn: '3/8',
              backgroundColor: '#54c6f9',
            }}
          >
            Even longer project
          </li>
        </ul>
      </div>
      <div className="gantt__row">
        <div className="gantt__row-first">Ky Verick</div>
        <ul className="gantt__row-bars">
          <li
            style={{
              gridColumn: '3/8',
              backgroundColor: '#54c6f9',
            }}
          >
            Long project
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReactiveTimeline;
