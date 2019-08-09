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
  startDate?: string;
  endDate?: string;
  components?: TimelineComponentsRewrite;
  stateless?: boolean;
  withHeader: HeaderRenderFunction;
  withBody?: BodyRenderFunction;
  withFirstColumn?: FirstColumnRenderFunction;
  numberOfColumns: number;
  withFirstColumnSize?: string;
  data?: ColumnSizing[];
  onChange?: Function;
  onImmediateChange?: Function;
  stripped?: boolean;
}

/**
 * We figure out the movement type in the observable
 * pipe and use direction and type to identify.
 */
declare enum MovementType {
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
