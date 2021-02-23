import React from 'react';
import { renderToString } from 'react-dom/server';

const renderPopulationTooltip = (feature) => {
  return renderToString(
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <strong style={{ marginRight: '5px' }}>Total Population:</strong>
        <span>{feature.properties.total_population.toFixed(2)}</span>
      </div>
      <div>
        <strong style={{ marginRight: '5px' }}>Percent Women:</strong>
        <span>20%</span>
      </div>
      <div>
        <strong style={{ marginRight: '5px' }}>Percent Men:</strong>
        <span>80%</span>
      </div>
    </div>
  );
};

export default renderPopulationTooltip;
