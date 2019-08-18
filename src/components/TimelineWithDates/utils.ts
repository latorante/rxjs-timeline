import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInMonths from 'date-fns/differenceInMonths';

import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';

import { TimelineDivisionMode, CalculatedTimelineProps } from './declarations';

/**
 * Used to calcualte a date with added days / weeks / months
 *
 * @param startDate
 * @param add
 * @param mode
 */
export function calculateExpandedDate(
  startDate: Date,
  add: number,
  mode: TimelineDivisionMode
): Date {
  /**
   * In case we're not actually adding,
   * save the computing power.
   */
  if (add < 1) {
    return startDate;
  }
  switch (mode) {
    case TimelineDivisionMode.Day:
      return addDays(startDate, add);
    case TimelineDivisionMode.Week:
      return addWeeks(startDate, add);
    default:
      return addMonths(startDate, add);
  }
}

/**
 * Used to calculate initial values
 * for TimelineComponent
 *
 * @param startDate
 * @param endDate
 * @param mode
 */
export function calculateTimelineProps(
  startDate: Date,
  endDate: Date,
  mode: TimelineDivisionMode
): CalculatedTimelineProps {
  const from = startOfWeek(startDate, { weekStartsOn: 1 });
  const to = endOfWeek(endDate, { weekStartsOn: 1 });
  let numberOfColumns;
  if (mode === TimelineDivisionMode.Day || mode === TimelineDivisionMode.Week) {
    const numberOfDays = differenceInDays(to, from) + 1;
    numberOfColumns =
      mode === TimelineDivisionMode.Day ? numberOfDays : numberOfDays / 7;
  } else {
    numberOfColumns = differenceInMonths(to, from);
  }
  return {
    from,
    to,
    numberOfColumns,
  };
}
