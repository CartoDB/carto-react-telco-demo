import React from 'react';
import { Box, makeStyles, Typography, Divider } from '@material-ui/core';
import { HtmlOverlay, HtmlOverlayItem } from '@nebula.gl/overlays';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  divider: {
    height: '2px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(1, 0, 1.5),
  },
}));
export const CapexOverlayItem = ({ className }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.section}>
        <Typography variant='h5'>USD 486k</Typography>
        <Typography variant='subtitle'>Untapped Market Potential</Typography>
      </Box>
      <Divider flexItem className={classes.divider} />
      <Box className={classes.section}>
        <Typography variant='h6'>58%</Typography>
        <Typography variant='subtitle'>Competition Market Coverage</Typography>
      </Box>
      <Divider flexItem className={classes.divider} />
      <Box className={classes.section}>
        <Typography variant='h6'>Age Distribution</Typography>
        <Typography variant='subtitle'>???</Typography>
      </Box>
    </Box>
  );
};
