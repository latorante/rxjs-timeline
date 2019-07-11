import { MovementType } from './constants';

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
 * Get Element index position
 *
 * @param target
 */
export function getElementIndex(target?: HTMLElement): number {
  if (!target) {
    return -1;
  }
  const parentNode: HTMLElement = target.parentNode as HTMLElement;
  return getElementType(target) === MovementType.Drag
    ? parseInt(target.getAttribute('data-index') as string, 10)
    : parseInt(parentNode.getAttribute('data-index') as string, 10);
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
