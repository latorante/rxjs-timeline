import { EventResult } from '../global';

/**
 * Type definitions for rxjs-timeline
 * project: RXJS Timeline
 * Definitions by: latorante
 */

export interface PartialMouseEvent {
  startClientX: number;
  target: HTMLElement;
}

export interface FilterMouseEventsFunction {
  (value: EventResult, index: number): boolean;
}
