import { storiesOf } from '@storybook/react';
import React from 'react';

import Timeline from '../src/components/Timeline';

storiesOf('RXJS Timeline', module).add('Demo', () => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Timeline />
  </div>
));
