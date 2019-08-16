import { storiesOf } from '@storybook/react';
import React from 'react';

import Timeline from '../src/components/Timeline';
// import ReactiveTimelineWithDates from '../src/components/TimelineWithDates';
import { ReactiveColumnWrapperProps } from '../src/components/TimelineElements/declarations';

const Layout = ({ children }: any) => (
  <div
    style={{
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '100px 0'
    }}
  >
    {children}
  </div>
);

// storiesOf('RXJS Timeline / Automated', module).add('Using dates', () => (
//   <Layout>
//     <ReactiveTimelineWithDates />
//   </Layout>
// ));

// @ts-ignore
storiesOf('RXJS Timeline / Controlled', module)
  .add('With First Column', () => (
    <Layout>
      <Timeline
        data={[[1, 3], [2, 5], [5, 6]]}
        numberOfColumns={12}
        withFirstColumnSize="150px"
        withHeader={(index: number) => (
          <React.Fragment>
            {new Date(2009, index, 1).toLocaleString('default', {
              month: 'short',
            })}
          </React.Fragment>
        )}
        withFirstColumn={(index: number, isHeader: boolean, row: any) => (
          <React.Fragment>
            {isHeader ? '' : <React.Fragment>Row #{index}</React.Fragment>}
          </React.Fragment>
        )}
        withBody={({ columnSizing }: ReactiveColumnWrapperProps) => (
          <React.Fragment>
            {new Date(2009, columnSizing[0] - 1, 1).toLocaleString('default', {
              month: 'short',
            })}{' '}
            -{' '}
            {new Date(
              2009,
              columnSizing[0] + columnSizing[1] - 2,
              1
            ).toLocaleString('default', {
              month: 'short',
            })}
          </React.Fragment>
        )}
        onChange={(...data: any) => {
          console.log('Changed: ', data);
        }}
      />
    </Layout>
  ))
  .add('Without First Column', () => (
    <Layout>
      <Timeline
        data={[[1, 3], [2, 5], [5, 6]]}
        numberOfColumns={12}
        withFirstColumnSize="150px"
        withHeader={(index: number) => (
          <React.Fragment>
            {new Date(2009, index, 1).toLocaleString('default', {
              month: 'short',
            })}
          </React.Fragment>
        )}
        withFirstColumn={undefined}
        withBody={({ columnSizing }: ReactiveColumnWrapperProps) => (
          <React.Fragment>
            {new Date(2009, columnSizing[0] - 1, 1).toLocaleString('default', {
              month: 'short',
            })}{' '}
            -{' '}
            {new Date(
              2009,
              columnSizing[0] + columnSizing[1] - 2,
              1
            ).toLocaleString('default', {
              month: 'short',
            })}
          </React.Fragment>
        )}
      />
    </Layout>
  ));
