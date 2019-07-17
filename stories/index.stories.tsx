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

storiesOf('RXJS Timeline', module)
  .add('Controlled', () => (
    <Layout>
      <Timeline
        data={[[1, 3], [2, 5], [5, 6]]}
        numberOfColumns={12}
        withHeader={(index: number) => (
          <React.Fragment>
            {new Date(2009, index, 1).toLocaleString('default', {
              month: 'short',
            })}
          </React.Fragment>
        )}
        withFirstColumn={(index: number, isHeader: boolean, row: any) => (
          <React.Fragment>
            {isHeader ? '' : <React.Fragment>#{index}</React.Fragment>}
          </React.Fragment>
        )}
      />
    </Layout>
  ))
  .add('Dependent children', () => (
    <Layout>
      <strong>Arrows</strong>
    </Layout>
  ))
  .add('Custom styles', () => (
    <Layout>
      <strong>Custom Styles</strong>
    </Layout>
  ))
  .add('Advanced', () => (
    <Layout>
      <strong>Advanced</strong>
    </Layout>
  ));
