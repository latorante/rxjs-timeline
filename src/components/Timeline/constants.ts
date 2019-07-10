/**
 * We make each event passive, to not block browser
 */
export const PASSIVE_EVENT: PassiveEvent = { passive: true };

/**
 * Which move are we preformming
 * @type {*}
 */
export const MOVEMENT_TYPE: MovementType = {
  DRAG: 0,
  RESIZE: 1,
  LEFT: 2,
  RIGHT: 3,
  NONE: 4,
};

export default {};
