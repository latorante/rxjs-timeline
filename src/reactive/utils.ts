import { PartialMouseEvent } from './declarations';

/**
 * 1.
 *
 * In the RXJS pipe for the mousedown and move
 * we only care about couple of properties.
 */
export function mapMouseEventIntoPartialEvent({
  clientX,
  target,
}: MouseEvent): PartialMouseEvent {
  return {
    startClientX: clientX,
    target: target as HTMLElement,
  };
}
