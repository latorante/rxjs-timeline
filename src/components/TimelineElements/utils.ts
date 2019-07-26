import { ColumnSizing } from './declarations';
import { MovementType } from '../Timeline/constants';
import { EventResult } from '../../global';

/**
 * This is really simple, the timeline element touches
 * the left boundary (is all the way to the left on one left end)
 * if the column start is 1.
 *
 * @param columnStart
 */
export function isTouchingLeftBoundary(columnStart: number) {
  return columnStart === 1;
}

/**
 * The timeline element is touching the right boundary (the right side of it
 * is all at the end of the timeline)
 *
 * @param columnStart
 * @param columnSpan
 * @param numberOfColumns
 */
export function isTouchingRightBoundary(
  columnStart: number,
  columnSpan: number,
  numberOfColumns: number
) {
  return numberOfColumns === columnStart + columnSpan - 1;
}

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
 * Calculate delta of movement
 *
 * @param difference
 * @param blockSize
 */
export function calculateMovementDelta(
  difference: number,
  blockSize: number
): number {
  return (difference / blockSize + 0.5) << 0; // @ts-ignore
}

/**
 * If the mouse moves more than a threshold given in each direction
 * we will make the change.
 *
 * @param startX
 * @param endX
 * @param blockSize
 * @param factor
 */
export function calculateIfShouldChangeSize(
  startX: number,
  endX: number,
  blockSize: number,
  factor: number = 2
): [boolean, number] {
  // const factorSize: number = blockSize / factor;
  const difference: number = calculateMovementDifference(startX, endX);
  const differenceDelta: number = calculateMovementDelta(difference, blockSize);
  // TODO: Investigate
  // return [difference >= factorSize, differenceDelta];
  return [true, differenceDelta];
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
  currentColumnSpan: number,
  changedDelta: number,
  columns: number
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
  changedDelta: number,
  columns: number
): number {
  /**
   * Exit early, if we're dragging, span of the timeline doesn't change
   */
  if (type === MovementType.Drag) {
    return currentColumnSpan;
  }

  /**
   * If the user tries to resize the element to the left,
   * but he's at the 1st position already, do nothing.
   */
  if (
    type === MovementType.Resize &&
    direction === MovementType.Left &&
    directionFrom === MovementType.Left &&
    isTouchingLeftBoundary(changedColumnStart)
  ) {
    return currentColumnSpan;
  }

  if (
    type === MovementType.Resize &&
    direction === MovementType.Right &&
    directionFrom === MovementType.Right &&
    isTouchingRightBoundary(changedColumnStart, currentColumnSpan, columns)
  ) {
    return currentColumnSpan;
  }

  /**
   * The rules go like this:
   *  - If we are moving from left end to left, we need to expand the span
   *  - If we are moving from left to the right, we need to reduce the span
   *  - If we are moving from right to the left, we need to reduce the span
   *  - If we are moving from right to right, we need to expand the span
   */
  const isExpanding: boolean =
    (directionFrom === MovementType.Left && direction === MovementType.Left) ||
    (directionFrom === MovementType.Right && direction === MovementType.Right);
  return isExpanding
    ? currentColumnSpan + changedDelta
    : currentColumnSpan - changedDelta;
}

/**
 * Each row will have a maximum and minimum size it can have in any
 * given scenario
 *
 * @param value
 * @param minimum
 * @param maximum
 */
export function calculateRangeValue(
  value: number,
  minimum: number,
  maximum: number
): number {
  if (value <= minimum) {
    return minimum;
  }
  if (value >= maximum) {
    return maximum;
  }
  return value;
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
  [currentColumnStart, currentColumnSpan]: ColumnSizing,
  factor: number
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
    factor
  );

  /**
   * No need to change, return values we got
   */
  if (!shouldChangeSize) {
    return [currentColumnStart, currentColumnSpan] as ColumnSizing;
  }

  const minimumColumnStart = 1;
  const minimumColumnSpan = 1;

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
    currentColumnSpan,
    changedDelta,
    columns
  );
  const changedColumnStartFixed: number = calculateRangeValue(
    changedColumnStart,
    minimumColumnStart,
    columns
  );

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
    changedDelta,
    columns
  );
  const changedColumnSpanFixed: number = calculateRangeValue(
    changedColumnSpan,
    minimumColumnSpan,
    columns
  );

  const maximumColumnStart: number = columns - changedColumnSpanFixed + 1;
  const calculatedColumnStart: number = calculateRangeValue(
    changedColumnStartFixed,
    minimumColumnStart,
    maximumColumnStart
  );

  const maximumColumnSpan: number = columns - calculatedColumnStart + 1;
  const calculatedColumnSpan: number = calculateRangeValue(
    changedColumnSpanFixed,
    minimumColumnSpan,
    maximumColumnSpan
  );

  /**
   * And if we got here, we must be resizing, let's resize.
   * Protect minimum column start (to first column) and protect
   * maximum col span to number of columns.
   */
  return [calculatedColumnStart, calculatedColumnSpan];
}
