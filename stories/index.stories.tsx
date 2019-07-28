import { storiesOf } from '@storybook/react';
import React from 'react';

import Timeline from '../src/components/Timeline';
// import ReactiveTimelineWithDates from '../src/components/TimelineWithDates';
import { ReactiveColumnWrapperProps } from '../src/components/TimelineElements/declarations';

const Layout = ({ children }: any) => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

const defaultControlledProps = {
  data: [[1, 3], [2, 5], [5, 6]],
  numberOfColumns: 12,
  withFirstColumnSize: '150px',
};

// storiesOf('RXJS Timeline / Automated', module).add('Using dates', () => (
//   <Layout>
//     <ReactiveTimelineWithDates />
//   </Layout>
// ));

storiesOf('RXJS Timeline / Controlled', module)
  .add('With First Column', () => (
    <Layout>
      <Timeline
        {...defaultControlledProps}
        withHeader={(index: number) => (
          <React.Fragment>
            {new Date(2009, index, 1).toLocaleString('default', {
              month: 'short',
            })}
          </React.Fragment>
        )}
        withFirstColumn={(index: number, isHeader: boolean, row: any) => (
          <React.Fragment>
            {isHeader ? '' : (
<React.Fragment>
Row #{index}</React.Fragment>
)}
          </React.Fragment>
        )}
        withBody={({ columnSizing }: ReactiveColumnWrapperProps) => (
          <React.Fragment>
            {new Date(2009, columnSizing[0], 1).toLocaleString('default', {
              month: 'short',
            })}{' '}
            /{' '}
            {new Date(
              2009,
              columnSizing[0] + columnSizing[1],
              1
            ).toLocaleString('default', {
              month: 'short',
            })}
          </React.Fragment>
        )}
      />
    </Layout>
  ))
  .add('Without First Column', () => (
    <Layout>
      <Timeline {...defaultControlledProps} withFirstColumn={undefined} />
    </Layout>
  ));
