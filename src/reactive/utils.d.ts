import { EventResult } from '../global';

export interface PartialMouseEvent {
  startClientX: number;
  target: HTMLElement;
}

export interface FilterMouseEventsFunction {
  (value: EventResult, index: number): boolean;
}
