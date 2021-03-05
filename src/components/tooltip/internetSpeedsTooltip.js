import { renderToString } from 'react-dom/server';

import { Box, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { internetSpeedFormatter } from 'utils/formatter';

const useStyles = makeStyles((theme) => ({
  root: {},
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 10px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  divider: {
    margin: '10px',
  },
}));
const InternetSpeedTooltip = ({ feature }) => {
  const classes = useStyles();
  console.dir(feature);
  return (
    <Box className={classes.root}>
      <Box className={classes.section}>
        <Typography className={classes.title} variant='h5'>
          Fixed Internet Speed
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant='subtitle2'>Average Upload (mbps)</Typography>
        <Typography variant='subtitle2' className={classes.company}>
          {internetSpeedFormatter(feature.properties.fixed_avg_u_kbps).value}
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant='subtitle2'>Average Download (mbps)</Typography>
        <Typography variant='subtitle2' className={classes.company}>
          {internetSpeedFormatter(feature.properties.fixed_avg_d_kbps).value}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.section}>
        <Typography className={classes.title} variant='h5'>
          Mobile Internet Speed
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant='subtitle2'>Average Upload (mbps)</Typography>
        <Typography variant='subtitle2' className={classes.company}>
          {internetSpeedFormatter(feature.properties.mobile_avg_u_kbps).value}
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant='subtitle2'>Average Download (mbps)</Typography>
        <Typography variant='subtitle2' className={classes.company}>
          {internetSpeedFormatter(feature.properties.mobile_avg_d_kbps).value}
        </Typography>
      </Box>
    </Box>
  );
};
const renderInternetSpeeds = (feature) =>
  renderToString(<InternetSpeedTooltip feature={feature} />);

export default renderInternetSpeeds;
