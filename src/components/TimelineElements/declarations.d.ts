/// <reference path="../../global.d.ts" />

import { BehaviorSubject } from 'rxjs';

export interface ColumnSizingResult {
  columnSizing: ColumnSizing;
  index: number;
}

/**
 * Timeline item component props
 */
export interface ReactiveColumnWrapperProps {
  columns: number;
  i: number;
  observableItemSubject$: BehaviorSubject<null | EventResult>;
  columnSizing: ColumnSizing;
}

/**
 * When the element is moved, we decide where it starts,
 * the starting position on the grid
 */
export type ColumnStart = number;

/**
 * This property tells us how far does the element spans
 */
export type ColumnSpan = number;

/**
 * Columns Sizing interface retunred and used when calculating
 */
export type ColumnSizing = [ColumnStart, ColumnSpan];
