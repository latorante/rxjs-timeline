import React, { useMemo } from 'react';
import format from 'date-fns/format';

import Timeline from '../Timeline';
import { defaultProps } from './config';
import { TimelineWithDatesProps } from './declarations';
import { calculateTimelineProps, calculateHeaderGroupedDate } from './utils';

export function ReactiveTimelineWithDates({
  startDate,
  endDate,
  data,
  bodyDivisionMode,
  headerGroupingMode,
  withFirstColumn,
  withBody,
}: TimelineWithDatesProps) {
  const [startDateObject, endDateObject] = useMemo(() => {
    const startDateObject =
      startDate instanceof Date ? startDate : new Date(startDate);
    const endDateObject = endDate instanceof Date ? endDate : new Date(endDate);
    return [startDateObject, endDateObject];
  }, [startDate, endDate]);
  const { numberOfColumns, numberOfHeaderColumns } = useMemo(
    () =>
      calculateTimelineProps(
        startDateObject,
        endDateObject,
        bodyDivisionMode,
        headerGroupingMode
      ),
    [startDateObject, endDateObject, bodyDivisionMode]
  );
  return (
    <Timeline
      withFirstColumn={withFirstColumn}
      numberOfColumns={numberOfColumns}
      numberOfHeaderColumns={numberOfHeaderColumns}
      withHeader={(index: number) => {
        const [from, to] = calculateHeaderGroupedDate(
          startDateObject,
          index,
          headerGroupingMode
        );
        return (
          <React.Fragment>
            {format(from, 'dd/MM/yy')} - {format(to, 'dd/MM/yy')}
          </React.Fragment>
        );
      }}
      data={data}
      withBody={withBody}
      convertToColumn={(object: object) => {
        return [1, 2];
      }}
    />
  );
}
ReactiveTimelineWithDates.defaultProps = defaultProps;

export default ReactiveTimelineWithDates;
