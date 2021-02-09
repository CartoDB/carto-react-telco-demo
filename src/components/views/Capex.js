import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function Capex() {
  const classes = useStyles();

  // Auto import useEffect

  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
