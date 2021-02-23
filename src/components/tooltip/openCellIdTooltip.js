import React from 'react';
import { renderToString } from 'react-dom/server';

const renderOpenCellIdTooltip = (feature) => {
  return renderToString(
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <strong style={{ marginRight: '5px' }}>Technology: </strong>
        <span>{feature.properties.radio}</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <strong style={{ marginRight: '5px' }}>Last updated at:</strong>
        <span>2020-08-01</span>
      </div>
    </div>
  );
};

export default renderOpenCellIdTooltip;
