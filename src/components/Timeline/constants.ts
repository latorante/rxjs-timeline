import { PassiveEventType } from './declarations';

/**
 * We make each event passive, to not block browser
 * see here: https://developers.google.com/web/updates/2016/06/passdfive-event-listeners
 */
export const PassiveEvent: PassiveEventType = { passive: true };

/**
 * Element unique id's
 */

export const TimelineDOMElements = {
  ResizingElement: 'rxjs-timeline-resizing-element',
  BoundaryElement: 'rxjs-timeline-boundary-element',
};

/**
 * Which move are we performing
 * @type {*}
 */
export const enum MovementType {
  Drag,
  Resize,
  Left,
  Right,
  None,
}

export default {};
