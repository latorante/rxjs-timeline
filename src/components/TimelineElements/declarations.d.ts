// / <reference path="../../global.d.ts" />

/**
 * Type definitions for rxjs-timeline
 * project: RXJS Timeline
 * Definitions by: latorante
 */

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
  columnSizing: ColumnSizing;
  children: any;
}

export interface HeaderRenderProps {
  index: number;
}

export interface HeaderRenderFunction {
  (index: number): any;
}

export interface BodyRenderFunction {
  (props: ReactiveColumnWrapperProps): any;
}

export interface FirstColumnRenderProps {
  index: number;
  isHeader: boolean;
  row: any;
}
export interface FirstColumnRenderFunction {
  (index?: number, isHeader?: boolean, row?: any): any;
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
 * Columns Sizing interface returned and used when calculating
 */
export type ColumnSizing = [ColumnStart, ColumnSpan];
