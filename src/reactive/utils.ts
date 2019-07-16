import { PartialMouseEvent, FilterMouseEventsFunction } from './utils.d';
import { EventResult } from '../global';
import { calculateIfShouldChangeSize } from '../components/TimelineElements/utils';
import {
  getElementType,
  getElementDirectionFrom,
} from '../components/Timeline/utils';
import { MovementType } from '../components/Timeline/constants';

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

/**
 * Fallback CSS
 */
const grabbingCursor: string = ';cursor: grabbing;';

/**
 * Helpers with grabbing elements styling
 * - This sets curost to grab on start drag / resize and move
 */
export function setStartCursor(event: any): void {
  const target: HTMLElement = event.target;
  const targetType: MovementType = getElementType(target);
  const targetDirection: MovementType = getElementDirectionFrom(target);
  if (targetType && targetDirection) {
  }
  const style = document.body.getAttribute('style') as string;
  document.body.setAttribute('style', style + grabbingCursor);
}

/**
 * This resets back the original value
 */
export function setEndCursor(): void {
  const style = document.body.getAttribute('style') as string;
  document.body.setAttribute('style', style.replace(grabbingCursor, ''));
}
