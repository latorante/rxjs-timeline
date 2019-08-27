import { TimelineProps } from './declarations';

/**
 * Default function for data conversion
 * - just returns the data it already has
 *
 * @param data
 */
export const defaultConvertFunction = (data: any): any => data;

export const defaultProps: TimelineProps = {
  numberOfColumns: 1,
  numberOfHeaderColumns: 1,
  withHeader: () => null,
  stripped: true,
  data: [],
  convertFromColumn: defaultConvertFunction,
  convertToColumn: defaultConvertFunction,
};

export default defaultProps;
