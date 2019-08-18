// / <reference path="../../global.d.ts" />

import { StyledComponent } from '@emotion/styled';
import {
  HeaderRenderFunction,
  BodyRenderFunction,
  FirstColumnRenderProps,
  ColumnSizing,
  FirstColumnRenderFunction,
} from '../TimelineElements/declarations';

/**
 * Type definitions for rxjs-timeline
 * project: RXJS Timeline
 * Definitions by: latorante
 */

/**
 * Let users redefine components and renderers
 */
interface TimelineComponentsRewrite {
  Wrapper?: StyledComponent<any, any, any> | React.ComponentType;
  Row?: StyledComponent<any, any, any> | React.ComponentType;
  Columns?: StyledComponent<any, any, any> | React.ComponentType;
  FirstColumn?: StyledComponent<any, any, any> | React.ComponentType;
  Column?: StyledComponent<any, any, any> | React.ComponentType;
}

/**
 * Timeline main component props
 */
export interface TimelineProps {
  /**
   * The default set of render components ussed to render individual cells.
   * The options are:
   *
   * ```
   * {
   *  Wrapper,
   *  Row
   *  Columns
   *  FirstColumn
   *  Column
   * }
   * ```
   * */
  components?: TimelineComponentsRewrite;
  /**
   * The default header render function. This applies to
   * any column in header row - that is not a "first" column.
   * */
  withHeader: HeaderRenderFunction;
  /**
   * The default body render function. This applies to
   * any column in body row - that is not a "first" column.
   * */
  withBody?: BodyRenderFunction;
  /**
   * The default first column render function. This applies to
   * first column both in header and body rows.
   * */
  withFirstColumn?: FirstColumnRenderFunction;
  /**
   * Number of columns the timeline will render. Say for 12 months calendar,
   * we would render 12 columns.
   *
   * @default 1
   * */
  numberOfColumns: number;
  /**
   * We can set the size of the first column here.
   * */
  withFirstColumnSize?: string;
  /**
   * The data to renduer. The core function expects an array of arrays with column
   * start and span.
   * */
  data: ColumnSizing[];
  /**
   * This callback is called when user has finished moving / resizing an element on the timeline.
   */
  onChange?: Function;
  /**
   * This callback is called when user is moving / resizing an element. It should be avoided unless
   * for debugging purposes.
   * */
  onImmediateChange?: Function;
  /**
   * Stripped timeline has the vertical lines going from top
   * to bottom.
   *
   * @default true
   * */
  stripped?: boolean;
}

/**
 * We figure out the movement type in the observable
 * pipe and use direction and type to identify.
 */
export const enum MovementType {
  Drag,
  Resize,
  Left,
  Right,
  None,
}

/**
 * Passive event listeners ftw
 * see here: https://developers.google.com/web/updates/2016/06/passive-event-listeners
 */
export interface PassiveEventType {
  passive: boolean;
}
