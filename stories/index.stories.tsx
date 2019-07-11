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
    }}>
    {children}
  </div>
);

storiesOf('RXJS Timeline', module)
.add('Basic', () => (
  <Layout>
    <Timeline />
  </Layout>
))
.add('Dependent children', () => (
  <Layout><strong>Arrows</strong></Layout>
))
.add('Custom styles', () => (
  <Layout><strong>Custom Styles</strong></Layout>
))
.add('Advanced', () => (
  <Layout><strong>Advanced</strong></Layout>
));
