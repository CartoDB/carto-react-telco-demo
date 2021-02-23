import React from 'react';
import { renderToString } from 'react-dom/server';

import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
}));
const InternetSpeedTooltip = () => {
  const classes = useStyles();
  return (
    <div style={{ width: 200 }}>
      <div className={classes.sectionTitle}>Fixed Speeds </div>
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
      <div className={classes.sectionTitle}>Fixed Speeds </div>
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
const renderInternetSpeeds = (feature) => {
  const str = renderToString(<InternetSpeedTooltip feature={feature} />);
  console.dir(str);
  return str;
};

export default renderInternetSpeeds;
