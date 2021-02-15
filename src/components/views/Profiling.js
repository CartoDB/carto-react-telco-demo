import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    padding: theme.spacing(3, 3, 1.5),
  },
}));

export default function Profiling() {
  const classes = useStyles();

  // Auto import useEffect

  return (
    <Grid container direction='column' className={classes.root}>
      <Typography variant='h5' gutterBottom className={classes.title}>
        Geographic Profiling
      </Typography>
    </Grid>
  );
}
