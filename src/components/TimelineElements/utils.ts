import { ColumnSizing } from './declarations';
import { MovementType } from '../Timeline/constants';

/**
 * Calculate the difference in the movement of the element
 *
 * @param startX
 * @param endX
 */
export function calculateMovementDifference(
  startX: number,
  endX: number
): number {
  return Math.abs(endX - startX);
}

/**
 * Calculate detla of mevement
 *
 * @param difference
 * @param blockSize
 */
export function calculateMovementDelta(
  difference: number,
  blockSize: number
): number {
  return (difference / blockSize + 0.5) << 0;
}

/**
 * If the mouse moves more than a threshold given in each direction
 * we will make the change.
 *
 * @param startX
 * @param endX
 * @param blockSize
 * @param treshold
 */
export function calculateIfShouldChangeSize(
  startX: number,
  endX: number,
  blockSize: number,
  treshold: number = 2
): [boolean, number] {
  const thresholdSize = blockSize / treshold;
  const difference: number = calculateMovementDifference(startX, endX);
  const differenceDelta: number = calculateMovementDelta(difference, blockSize);
  return [difference >= thresholdSize, differenceDelta];
}

/**
 * Calculates the the column start, which is shared among
 * dragging and resizing (if resizing from left)
 *
 * @param direction
 * @param currentColumnStart
 * @param changedDelta
 */
export function calculateColumnStart(
  type: MovementType.Drag | MovementType.Resize | MovementType.None,
  direction: MovementType.Left | MovementType.Right,
  directionFrom: MovementType.Left | MovementType.Right,
  currentColumnStart: number,
  changedDelta: number
): number {
  /**
   * Exit early, if we are resizing from right,
   * the column start doesn't change in that case. It changes only
   * on drag or on resize from left dragger.
   */
  if (type === MovementType.Resize && directionFrom === MovementType.Right) {
    return currentColumnStart;
  }

  /**
   * The calculation is quite easy, we either add
   * changed delta steps, or we remove them.
   */
  const isReducing: boolean =
    (type === MovementType.Drag && direction === MovementType.Left) ||
    (type === MovementType.Resize && direction === MovementType.Left);

  return isReducing
    ? currentColumnStart - changedDelta
    : currentColumnStart + changedDelta;
}

/**
 * Calculate the columns span which only changes upon
 * resizing event.
 *
 * @param type
 * @param direction
 * @param directionFrom
 * @param currentColumnStart
 * @param changedDelta
 */
export function calculateColumnSpan(
  type: MovementType.Drag | MovementType.Resize | MovementType.None,
  direction: MovementType.Left | MovementType.Right,
  directionFrom: MovementType.Left | MovementType.Right,
  currentColumnSpan: number,
  changedColumnStart: number,
  changedDelta: number
): number {
  /**
   * Exit early, if we're dragging, span of the timeline doesn't change
   */
  if (type === MovementType.Drag) {
    return currentColumnSpan;
  }

  /**
   * The rules go like this:
   *  - If we are moving from left end to left, we need to expand the span
   *  - If we are moving from left to the right, we need to reduce the span
   *  - If we are moving from right to the left, we need to reduce the span
   *  - If we are moving frmo right to right, we need to expand the span
   */
  const isExpanding: boolean =
    (directionFrom === MovementType.Left && direction === MovementType.Left) ||
    (directionFrom === MovementType.Right && direction === MovementType.Right);
  return isExpanding
    ? currentColumnSpan + changedDelta
    : currentColumnSpan - changedDelta;
}

/**
 * Returns columns sizing
 *
 * @param event
 * @param elementSizerSize
 * @param param2
 */
export function calculateColumnSizing(
  event: EventResult | null,
  elementSizerSize: number,
  columns: number,
  [currentColumnStart, currentColumnSpan]: ColumnSizing
): ColumnSizing {
  /**
   * If no event was given, or element size (width) of a single
   * column, return initial values. No point to continue as calculations
   * without those 2 are impossible
   */
  if (!elementSizerSize || !event) {
    return [currentColumnStart, currentColumnSpan];
  }

  /**
   * Extract information we need from the event, to finish calculations
   * and positions later.
   */
  const { type, startClientX, endClientX, direction, directionFrom } = event;

  /**
   * If we have moved more than half the "grid" element size with our muse
   * in either direction, it's time to move / change the grid element left or right
   */
  const [shouldChangeSize, changedDelta]: [
    boolean,
    number
  ] = calculateIfShouldChangeSize(
    startClientX,
    endClientX,
    elementSizerSize,
    2 // The threshold is set to 1/6 of the element size
  );

  /**
   * No need to change, return values we got
   */
  if (!shouldChangeSize) {
    return [currentColumnStart, currentColumnSpan];
  }

  /**
   * If we're dragging we only calculate the initial position,
   * the first number. We don't change the span of the element.
   * That's easy and this function takes care of the caveats.
   */
  const changedColumnStart: number = calculateColumnStart(
    type,
    direction,
    directionFrom,
    currentColumnStart,
    changedDelta
  );
  const changedColumnStartFixed: number =
    changedColumnStart < 1
      ? 1
      : changedColumnStart > 12
      ? 12
      : changedColumnStart;

  /**
   * If we are dragging this doesn't change, but it does
   * on resizing, the helper will help with that.
   */
  const changedColumnSpan: number = calculateColumnSpan(
    type,
    direction,
    directionFrom,
    currentColumnSpan,
    changedColumnStartFixed,
    changedDelta
  );
  const changedColumnSpanFixed: number =
    changedColumnSpan > columns ? columns : changedColumnSpan;

  console.log(
    'Current type',
    type === MovementType.Drag ? 'Drag' : 'Resize',
    'Current start',
    currentColumnStart,
    'Changed start',
    changedColumnStartFixed,
    'Current span',
    currentColumnSpan,
    'Changed span',
    changedColumnSpanFixed
  );

  /**
   * And if we got here, we must be resizing, let's resize
   * Protect minimum column start ( tofirst column) and protect
   * maximum col span to number of columns
   */
  return [changedColumnStartFixed, changedColumnSpanFixed];
}
