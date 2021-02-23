import React from 'react';
import { renderToString } from 'react-dom/server';

const renderInternetSpeeds = (feature) => {
  return renderToString(
    <div style={{ width: 200 }}>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '14px',
          marginTop: '5px',
        }}
      >
        Fixed Speeds{' '}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <strong>Avg Download (kbps):</strong>
        100
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <strong>Avg Download (kbps):</strong>
        100
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <strong>Average Latency: (ms)</strong>
        10
      </div>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '14px',
          marginTop: '5px',
        }}
      >
        Mobile Speeds{' '}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <strong>Avg Download (kbps):</strong>
        100
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <strong>Avg Download (kbps):</strong>
        100
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <strong>Average Latency: (ms)</strong>
        10
      </div>
    </div>
  );
};

export default renderInternetSpeeds;
