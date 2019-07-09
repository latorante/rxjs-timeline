/**
 * The object piped down through the
 * observable stream
 */
interface EventResult {
  startClientX: number;
  endClientX: number;
  target: HTMLElement;
  type: string;
  index: number;
  direction: string;
  directionFrom: string;
}
