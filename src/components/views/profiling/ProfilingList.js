import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Typography } from '@material-ui/core';

import { AggregationTypes, FormulaWidget, CategoryWidget } from '@carto/react/widgets';

import { useDispatch } from 'react-redux';
import { setError } from 'config/appSlice';
import { numberFormatter } from 'utils/formatter';

import thailandAdminSource from 'data/sources/thailandAdminSource';
import populationPivotSource from 'data/sources/populationPivotSource';

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
    console.dir(error);
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
        column='population_total'
        operation={AggregationTypes.SUM}
        onError={onTotalPopulationWidgetError}
        formatter={numberFormatter}
      />
      <CategoryWidget
        id='categoryPopulation'
        title='Population By Category'
        dataSource={populationPivotSource.id}
        column='category'
        operationColumn='population'
        operation={AggregationTypes.SUM}
        onError={onTotalPopulationWidgetError}
        formatter={numberFormatter}
      />
    </Grid>
  );
}
