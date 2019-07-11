/**
 * Type definitions for rxjs-timeline
 * project: RXJS Timeline
 * Definitions by: latorante
 */

/**
 * Timeline main component props
 */
interface TimelineProps {
  startDate: string;
  endDate: string;
  items: any;
}

/**
 * We figure out the movement type in the observable
 * pipe and use direction and type to identify.
 */
declare enum MovementType {
  Drag,
  Resize,
  Left,
  Right,
  None,
}

/**
 * Passive event listeners ftw
 * see here: https://developers.google.com/web/updates/2016/06/passive-event-listeners
 */
interface PassiveEvent {
  passive: boolean;
}
