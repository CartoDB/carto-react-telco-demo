import { renderToString } from 'react-dom/server';

import { Box, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { internetSpeedFormatter } from 'utils/formatter';

const useStyles = makeStyles((theme) => ({
  root: {},
  titleSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '5 5px',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
  divider: {
    margin: '10px',
  },
  value: {
    padding: '0 5px',
  },
}));
const InternetSpeedTooltip = ({ feature }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.titleSection}>
        <Typography className={classes.title} variant='h6'>
          Fixed Internet Speed
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant='subtitle2'>Average Upload</Typography>
        <Typography variant='subtitle2' className={classes.value}>
          {internetSpeedFormatter(feature.properties.fixed_avg_u_kbps).value} (mbps)
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant='subtitle2'>Average Download</Typography>
        <Typography variant='subtitle2' className={classes.value}>
          {internetSpeedFormatter(feature.properties.fixed_avg_d_kbps).value} (mbps)
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.titleSection}>
        <Typography className={classes.title} variant='h6'>
          Mobile Internet Speed
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant='subtitle2'>Average Upload</Typography>
        <Typography variant='subtitle2' className={classes.value}>
          {internetSpeedFormatter(feature.properties.mobile_avg_u_kbps).value} (mbps)
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant='subtitle2'>Average Download</Typography>
        <Typography variant='subtitle2' className={classes.value}>
          {internetSpeedFormatter(feature.properties.mobile_avg_d_kbps).value} (mbps)
        </Typography>
      </Box>
    </Box>
  );
};
const renderInternetSpeeds = (feature) =>
  renderToString(<InternetSpeedTooltip feature={feature} />);

export default renderInternetSpeeds;
