import { useLayoutEffect } from 'react';

import { Observable, BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { takeUntil, map, switchMap } from 'rxjs/operators';
// import filter from 'rxjs/operators/filter';

import { PASSIVE_EVENT } from './constants';

export function ReactiveTimeline({
  startDate,
  endDate,
  items,
}: TimelineProps): void | Function {
  // Use them for now
  if (startDate || endDate || items) {
  }

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
          startClientX: clientX,
          target,
        })),
        // Merge when we stop moving, but switching into a new
        // observable, killing the prvious one
        switchMap(({ startClientX, target }) =>
          move$.pipe(
            // We only care about where it originated from
            // and where it went on the horizontal plane
            map(({ clientX }: MouseEvent) => ({
              startClientX,
              endClientX: clientX,
              target: target, // Where it all started from
              type: target.getAttribute('data-type'), // Resizing or dragging?
              index:
                target.getAttribute('data-type') === MOVEMENT_TYPE.DRAG
                  ? parseInt(target.getAttribute('data-index'), 10)
                  : parseInt(target.parentNode.getAttribute('data-index'), 10),
              // Which direction are we dragging / resizing?
              direction:
                startClientX > clientX
                  ? MOVEMENT_TYPE.LEFT
                  : MOVEMENT_TYPE.RIGHT,
              // Which edge have we started on
              directionFrom: target.getAttribute('data-edge'),
            })),
            takeUntil(stopMove$)
          )
        )
      )
      .subscribe((event: EventResult) => observableItemSubject$.next(event));
    // Feed it to the subjects
    // Unsubscribe after unmount
    return function cleanup() {
      resizeTimelineItem.unsubscribe();
    };
  });
}

export default ReactiveTimeline;
