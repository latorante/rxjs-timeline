import { MovementType } from './constants';
import { ColumnSizing } from 'components/TimelineElements/declarations';

/**
 * Get element type
 *
 * @param target
 */
export function getElementType(target?: HTMLElement): MovementType {
  if (!target) {
    return -1;
  }
  return parseInt(target.getAttribute('data-type') as string, 10);
}

/**
 * Get element holding the index and column sizing
 *
 * @param target
 * @param type
 */
export function getElementTarget(target: HTMLElement): HTMLElement {
  return getElementType(target) === MovementType.Drag
    ? (target as HTMLElement)
    : (target.parentNode as HTMLElement);
}

/**
 * Get Element index position
 *
 * @param target
 */
export function getElementIndex(target?: HTMLElement): number {
  if (!target) {
    return -1;
  }
  const targetElement: HTMLElement = getElementTarget(target);
  return parseInt(targetElement.getAttribute('data-index') as string, 10);
}

/**
 * Get direction
 *
 * @param target
 */
export function getElementDirectionFrom(target?: HTMLElement): number {
  if (!target) {
    return -1;
  }
  return parseInt(target.getAttribute('data-edge') as string, 10);
}

/**
 * Get Element Direction (left / right)
 *
 * @param startClientX
 * @param clientX
 * @param target
 */
export function getElementDirection(
  startClientX: number,
  clientX: number
): number {
  return startClientX > clientX ? MovementType.Left : MovementType.Right;
}

/**
 * Get element sizing
 * @param target
 */
export function getElementSizing(target?: HTMLElement): ColumnSizing {
  if (!target) {
    return [0, 0];
  }
  const targetElement: HTMLElement = getElementTarget(target);
  const targetSizing: string = targetElement.getAttribute(
    'data-sizing'
  ) as string;
  return targetSizing
    .split(',')
    .map(number => parseInt(number, 10)) as ColumnSizing;
}
