import { PassiveEventType } from './module';

/**
 * We make each event passive, to not block browser
 * see here: https://developers.google.com/web/updates/2016/06/passive-event-listeners
 */
export const PassiveEvent: PassiveEventType = { passive: true };

/**
 * Which move are we performing
 * @type {*}
 */
export const enum MovementType {
  Drag,
  Resize,
  Left,
  Right,
  None,
}

export default {};
