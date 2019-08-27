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

/**
 * Props mapping that can be overwritten
 */
export interface TimelineObjectDataMapping {
  /**
   * The object passed in `data` property needs 
   * to be mapped to start date, for the timeline to
   * work.
   */
  startDate: string,
  /**
   * The object passed in `data` property needs 
   * to be mapped to end date, for the timeline to
   * work.
   */
  endDate: string,
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
 /**
   * Number of vertical columns - in header
   */
  numberOfHeaderColumns: number,
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
  startDate: string | Date;
  /**
   * The dated component can have a end date that represents
   * when the timeline ends.
   *
   * @format `2019-08-01`
   */
  endDate: string | Date;

  /**
   * The data to render. The core function expects an array of arrays with column
   * start and span.
   */
  data: any[];

  /**
   * The mode the timeline will use to create columns. It could be either:
   * - Divide by months
   * - Divide by weeks
   * - Divide by days
   */
  bodyDivisionMode: TimelineDivisionMode;

  /**
   * We can group the header by:
   * - Divide by months
   * - Divide by weeks
   * - Divide by days
   */
  headerGroupingMode: TimelineDivisionMode;

  /**
   * Mapping of properties inside the passed 
   * objects in `data` prop
   */
  dataMapping?: TimelineObjectDataMapping;
}
