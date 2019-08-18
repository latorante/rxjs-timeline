import { TimelineWithDatesProps, TimelineDivisionMode } from './declarations';
import { defaultProps as baseDefaultProps } from '../Timeline/config';

export const defaultProps: Partial<TimelineWithDatesProps> = {
  ...baseDefaultProps,
  mode: TimelineDivisionMode.Week,
};

export default defaultProps;
