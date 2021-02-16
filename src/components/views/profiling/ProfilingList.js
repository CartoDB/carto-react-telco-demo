import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Typography } from '@material-ui/core';

import { AggregationTypes, FormulaWidget } from '@carto/react/widgets';

import { useDispatch } from 'react-redux';
import { setError } from 'config/appSlice';
import { numberFormatter } from 'utils/formatter';

import thailandAdminSource from 'data/sources/thailandAdminSource';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    padding: theme.spacing(3, 3, 1.5),
  },
}));

export default function Profiling() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Auto import useEffec

  const onTotalPopulationWidgetError = (error) => {
    dispatch(setError(`Error obtaining total population: ${error.message}`));
  };
  return (
    <Grid container direction='column' className={classes.root}>
      <Typography variant='h5' gutterBottom className={classes.title}>
        Geographic Profiling
      </Typography>
      <Divider />
      <FormulaWidget
        id='totalPopulation'
        title='Total Population'
        dataSource={thailandAdminSource.id}
        column='population'
        operation={AggregationTypes.SUM}
        onError={onTotalPopulationWidgetError}
        formatter={numberFormatter}
        viewportFilter
      />
    </Grid>
  );
}
