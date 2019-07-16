/**
 * Type definitions for rxjs-timeline
 * project: RXJS Timeline
 * Definitions by: latorante
 */

/**
 * The object piped down through the
 * observable stream
 */
export interface EventResult {
  startClientX: number;
  endClientX: number;
  target: HTMLElement;
  type: number;
  index: number;
  direction: number;
  directionFrom: number;
  blockSize: number;
}
