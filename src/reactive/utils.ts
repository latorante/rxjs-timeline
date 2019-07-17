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
export const grabbingCursor: string = ';cursor: grabbing;';
export const resizeCursorLeft: string = ';cursor: w-resize;';
export const resizeCursorRight: string = ';cursor: e-resize;';

/**
 * Get Cursor helper is feeded a MouseEvent
 * and figures what the cursor will be on the document.
 * 
 * We use this to simulate the cursor while you drag / resize on an element
 * while React re-draws the element underneath, which forces in normal behavior
 * the element to loose the cursor.
 */
export getCursor(event: any): string {
  if(!event){
    return '';
  }
  const target: HTMLElement = event.target;
  const targetType: MovementType = getElementType(target);
  /**
   * Exit early, if we're dragging, we don't need to
   * figure out the direction and just return grabbing cursor.
   */
  if(targetType === MovementType.Drag){
    return grabbingCursor;
  }
  const targetDirection: MovementType = getElementDirectionFrom(target);
  return targetDirection === MovementType.Left ? resizeCursorLeft : resizeCursorRight;
}

/**
 * Helpers with grabbing elements styling
 * - This sets cursor to grab on start drag / resize and move
 */
export function setStartCursor(event: any): void {
  if(!event){
    return;
  }
  const cursor = getCursor(event);
  const style = document.body.getAttribute('style') as string;
  document.body.setAttribute('style', style + cursor);
}

/**
 * This resets back the original value
 */
export function setEndCursor(event: any): void {
  if(!event){
    return;
  }
  const cursor = getCursor(event);
  const style = document.body.getAttribute('style') as string;
  document.body.setAttribute('style', style.replace(cursor, ''));
}
