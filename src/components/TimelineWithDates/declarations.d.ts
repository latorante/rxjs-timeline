// / <reference path="../../global.d.ts" />

import { TimelineProps } from '../Timeline/declarations';

/**
 * The mode the timeline will operate in. This could be:
 * - Divide by months
 * - Divide by weeks
 * - Divide by days
 */
export const enum TimelineDivisionMode {
  Month,
  Week,
  Day,
}

export interface CalculatedTimelineProps {
  /**
   * Date From
   */
  from: Date;
  /**
   * Date to
   */
  to: Date;
  /**
   * Number of vertical columns
   */
  numberOfColumns: number;
}

/**
 * Timeline with Dates props
 */
export interface TimelineWithDatesProps extends TimelineProps {
  /**
   * The dated component can have a start date that represents
   * when the timeline starts.
   *
   * @format `2019-08-01`
   */
  startDate: string;
  /**
   * The dated component can have a end date that represents
   * when the timeline ends.
   *
   * @format `2019-08-01`
   */
  endDate: string;

  /**
   * The data to renduer. The core function expects an array of arrays with column
   * start and span.
   */
  data: any[];

  /**
   * The mode the timeline will use to create columns. It could be either:
   * - Divide by months
   * - Divide by weeks
   * - Divide by days
   */
  mode: TimelineDivisionMode;
}
