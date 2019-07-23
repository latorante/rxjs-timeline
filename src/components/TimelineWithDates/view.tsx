import React, { useEffect } from 'react';

import Timeline from '../Timeline';

export function ReactiveTimelineWithDates() {
  useEffect(() => {
    return () => {
      // Cleanup
    };
  }, []);
  return <Timeline />;
}

export default ReactiveTimelineWithDates;
