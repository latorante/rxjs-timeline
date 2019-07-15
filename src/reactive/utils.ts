import { PartialMouseEvent, FilterMouseEventsFunction } from './utils.d';
import { EventResult } from '../global';
import { calculateIfShouldChangeSize } from '../components/TimelineElements/utils';

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

/**
 * Filter mouse events only to the ones, that have a correct threshold of movement
 * - as in, we don't care about events that don't move more than x pixels of the sizing block
 * @param blockSize
 * @param factor
 */
export function filterMouseEvents(
  blockSize: number,
  factor: number
): FilterMouseEventsFunction {
  return ({ startClientX, endClientX }: EventResult): boolean => {
    return calculateIfShouldChangeSize(
      startClientX,
      endClientX,
      blockSize,
      factor
    )[0];
  };
}
