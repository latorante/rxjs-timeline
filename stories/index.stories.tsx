import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('RXJS Timeline', module)
  .add('Demo', () => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ background: 'black' }}>Test</div>
    </div>
  ));
