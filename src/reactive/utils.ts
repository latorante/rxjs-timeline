import {
  PartialMouseEvent,
  InitialBoundary,
  FilterMouseEventsFunction,
} from './utils.d';
import { EventResult } from '../global';
import { calculateIfShouldChangeSize } from '../components/TimelineElements/utils';
import {
  getElementType,
  getElementDirectionFrom,
} from '../components/Timeline/utils';
import {
  MovementType,
  TimelineDOMElements,
} from '../components/Timeline/constants';

/**
 * The boundaries of draggable area.
 * Because user can easily drag his mouse the end of the left screen, leaving
 * the area for the elements to fit in, which would lead to undesired side-effects,
 * we get the `leftBoundary` and `rightBoundary` from the header's row position in the
 * screen.
 */
export function getDraggableAreaBoundary(): InitialBoundary {
  const headerRow: HTMLElement | null = document.getElementById(
    TimelineDOMElements.BoundaryElement
  );
  const headerRowRect: ClientRect | DOMRect | null = headerRow
    ? headerRow.getBoundingClientRect()
    : null;
  const leftBoundary: number = headerRowRect ? headerRowRect.left : 0;
  const rightBoundary: number = headerRowRect
    ? headerRowRect.left + headerRowRect.width
    : 0;
  return {
    leftBoundary,
    rightBoundary,
  };
}

/**
 * In the RXJS pipe for the mousedown and move
 * we only care about couple of properties. At the start of each
 * drag or resize, we care about the initial position, and the boundary
 */
export function mapMouseEventIntoPartialEvent({
  clientX,
  target,
}: MouseEvent): PartialMouseEvent {
  return {
    startClientX: clientX,
    target: target as HTMLElement,
    ...getDraggableAreaBoundary(),
  };
}

/**
 * Filter out middle clicks and right clicks (respectively)
 *
 * @param event
 */
export function filterMouseEventsOutOfBoundary(
  leftBoundary: number,
  rightBoundary: number
) {
  return (event?: any): boolean => {
    if (!event) {
      return false;
    }
    return event.clientX >= leftBoundary && event.clientX <= rightBoundary;
  };
}

/**
 * Filter mouse events only to the ones, that have a correct threshold of movement
 * - as in, we don't care about events that don't move more than x pixels of the sizing block
 * @param blockSize
 * @param factor
 */
export function filterMouseEventsWithinFactor(
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
 * Filter out middle clicks and right clicks (respectively)
 *
 * @param event
 */
export function filterOutRightAndMiddleClicks(event?: any): boolean {
  if (!event) {
    return false;
  }
  return event.which !== 2 && event.which !== 3;
}

/**
 * CSS helper object with inline CSS attached to body element
 * on drag / resize.
 */
export const CrossBrowserCSS = {
  selectable:
    'user-select: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;',
  pointable: 'pointer-events: none !important;',
  grabbing:
    'cursor: grabbing !important; cursor: -moz-grabbing !important; cursor: -webkit-grabbing !important;',
};

/**
 * Cursor CSS on the body element.
 * Note that we have the comment css inside so we can
 * easily target our CSS and remove it should there be (for some reason?)
 * client's css applied to the body already.
 */
export const grabbingCursor = `${CrossBrowserCSS.grabbing}${CrossBrowserCSS.selectable}${CrossBrowserCSS.pointable}`;
export const resizeCursorLeft = `cursor: w-resize !important;${CrossBrowserCSS.selectable}${CrossBrowserCSS.pointable}`;
export const resizeCursorRight = `cursor: e-resize !important;${CrossBrowserCSS.selectable}${CrossBrowserCSS.pointable}`;

/**
 * Get Cursor helper is feeded a MouseEvent
 * and figures what the cursor will be on the document.
 *
 * We use this to simulate the cursor while you drag / resize on an element
 * while React re-draws the element underneath, which forces in normal behavior
 * the element to loose the cursor.
 */
export function getCursor(event: any): string {
  if (!event) {
    return '';
  }
  const { target } = event;
  const targetType: MovementType = getElementType(target);
  /**
   * Exit early, if we're dragging, we don't need to
   * figure out the direction and just return grabbing cursor.
   */
  if (targetType === MovementType.Drag) {
    return grabbingCursor;
  }
  const targetDirection: MovementType = getElementDirectionFrom(target);
  return targetDirection === MovementType.Left
    ? resizeCursorLeft
    : resizeCursorRight;
}

/**
 * Helpers with grabbing elements styling
 * - This sets cursor to grab on start drag / resize and move
 */
export function setStartCursor(event: any): void {
  if (!event) {
    return;
  }
  const cursor = getCursor(event);
  const style = document.body.getAttribute('style');
  document.body.setAttribute('style', style || `${cursor}`);
}

/**
 * This resets back the original value
 */
export function setEndCursor(event: any): void {
  if (!event) {
    return;
  }
  let style = document.body.getAttribute('style') as string;
  if (style && style.length > 0) {
    style = style.replace(grabbingCursor, '');
    style = style.replace(resizeCursorLeft, '');
    style = style.replace(resizeCursorRight, '');
    document.body.setAttribute('style', style);
  }
}

export default {};
