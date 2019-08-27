import { TimelineWithDatesProps, TimelineDivisionMode } from './declarations';
import { defaultProps as baseDefaultProps } from '../Timeline/config';
import { BodyRenderFunction } from '../TimelineElements/declarations';

export const defaultBodyRenderFunction: BodyRenderFunction = () => '';

export const defaultDataMapping: Partial<TimelineWithDatesProps> = {
  dataMapping: {
    startDate: 'startDate',
    endDate: 'endDate',
  },
};

export const defaultProps: Partial<TimelineWithDatesProps> = {
  ...baseDefaultProps,
  ...defaultDataMapping,
  bodyDivisionMode: TimelineDivisionMode.Day,
  headerGroupingMode: TimelineDivisionMode.Week,
  withBody: defaultBodyRenderFunction,
};

export default defaultProps;
