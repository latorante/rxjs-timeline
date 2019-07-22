import { storiesOf } from '@storybook/react';
import React from 'react';

import Timeline from '../src/components/Timeline';

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
  withHeader: (index: number) => (
    <React.Fragment>
      {new Date(2009, index, 1).toLocaleString('default', {
        month: 'short',
      })}
    </React.Fragment>
  ),
  withFirstColumn: (index: number, isHeader: boolean, row: any) => (
    <React.Fragment>
      {isHeader ? '' : <React.Fragment>
Row #{index}</React.Fragment>}
    </React.Fragment>
  ),
  withFirstColumnSize: '150px',
};

storiesOf('RXJS Timeline / Controlled', module)
  .add('With First Column', () => (
    <Layout>
      <Timeline {...defaultControlledProps} />
    </Layout>
  ))
  .add('Without First Column', () => (
    <Layout>
      <Timeline {...defaultControlledProps} withFirstColumn={undefined} />
    </Layout>
  ))
  .add('Without Header and First Column', () => (
    <Layout>
      <Timeline
        {...defaultControlledProps}
        withFirstColumn={undefined}
        withHeader={undefined}
      />
    </Layout>
  ));
