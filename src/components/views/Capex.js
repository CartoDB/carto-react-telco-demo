import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    padding: theme.spacing(3, 3, 1.5),
  },
  sliderContainer: {
    padding: theme.spacing(3, 3, 1.5),
  },
  drawToolsContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3, 3, 1.5),
  },
  drawButton: {
    '&.MuiToggleButton-root': {
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      },
      color: theme.palette.primary.light,
      backgroundColor: theme.palette.primary.contrastText,
      border: `solid 2px ${theme.palette.primary.light}`,
    },
  },
  drawButtonContainer: {
    margin: 10,
  },
}));

export default function Capex() {
  const classes = useStyles();
  return (
    <Grid container direction='column' className={classes.root}>
      <Typography variant='h5' gutterBottom className={classes.title}>
        Smart Capex Investment
      </Typography>
    </Grid>
  );
}
