import React, { useMemo } from 'react';

import Timeline from '../Timeline';
import { defaultProps } from './config';
import { TimelineWithDatesProps } from './declarations';
import { calculateTimelineProps, calculateExpandedDate } from './utils';

export function ReactiveTimelineWithDates({
  startDate,
  endDate,
  data,
  mode,
  withFirstColumn,
}: TimelineWithDatesProps) {
  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);
  const { numberOfColumns } = useMemo(
    () => calculateTimelineProps(startDateObject, endDateObject, mode),
    [startDateObject, endDateObject, mode]
  );
  return (
    <Timeline
      numberOfColumns={numberOfColumns}
      withHeader={(index: number) => (
        <React.Fragment>
          {calculateExpandedDate(startDateObject, index, mode).toString()}
        </React.Fragment>
      )}
    />
  );
}
ReactiveTimelineWithDates.defaultProps = defaultProps;

export default ReactiveTimelineWithDates;
