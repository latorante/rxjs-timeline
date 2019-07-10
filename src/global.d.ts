/**
 * The object piped down through the
 * observable stream
 */
interface EventResult {
  startClientX: number;
  endClientX: number;
  target: HTMLElement;
  type: number;
  index: number;
  direction: number;
  directionFrom: number;
}
