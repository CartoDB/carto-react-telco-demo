import { renderToString } from 'react-dom/server';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
  root: {},
  section: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '18px',
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
        <PublishIcon />
        <Typography variant='subtitle2'>Average Upload</Typography>
        <Typography variant='subtitle2' className={classes.company}>
          {feature.properties.fixed_avg_u_kbps}
        </Typography>
      </Box>
      <Box className={classes.section}>
        <GetAppIcon />
        <Typography variant='subtitle2'>Average Download</Typography>
        <Typography variant='subtitle2' className={classes.company}>
          {feature.properties.fixed_avg_d_kbps}
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography className={classes.title} variant='h5'>
          Mobile Internet Speed
        </Typography>
      </Box>
      <Box className={classes.section}>
        <PublishIcon />
        <Typography variant='subtitle2'>Average Upload</Typography>
        <Typography variant='subtitle2' className={classes.company}>
          {feature.properties.mobile_avg_u_kbps}
        </Typography>
      </Box>
      <Box className={classes.section}>
        <GetAppIcon />
        <Typography variant='subtitle2'>Average Download</Typography>
        <Typography variant='subtitle2' className={classes.company}>
          {feature.properties.mobile_avg_d_kbps}
        </Typography>
      </Box>
    </Box>
  );
};
const renderInternetSpeeds = (feature) =>
  renderToString(<InternetSpeedTooltip feature={feature} />);

export default renderInternetSpeeds;
