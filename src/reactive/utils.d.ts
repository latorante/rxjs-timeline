import { EventResult } from '../global';

/**
 * Type definitions for rxjs-timeline
 * project: RXJS Timeline
 * Definitions by: latorante
 */

/**
 * Draggable area boundary
 */
export interface InitialBoundary {
  leftBoundary: number;
  rightBoundary: number;
}

/**
 * Initial transform of the browser event,
 * into a partial event with only handful of
 * needed information.
 */
export interface PartialMouseEvent extends InitialBoundary {
  startClientX: number;
  target: HTMLElement;
}

/**
 * Function to filter mouse events
 */
export interface FilterMouseEventsFunction {
  (value: EventResult, index: number): boolean;
}
