import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Typography } from '@material-ui/core';

import { AggregationTypes, FormulaWidget, CategoryWidget } from '@carto/react/widgets';

import { FormulaWidgetUI, WrapperWidgetUI, HistogramWidgetUI } from '@carto/react/ui';
import { useDispatch } from 'react-redux';
import { setError } from 'config/appSlice';
import { numberFormatter, percentageFormatter } from 'utils/formatter';

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
        column='total_population'
        operation={AggregationTypes.SUM}
        onError={onTotalPopulationWidgetError}
        formatter={numberFormatter}
        viewportFilter
      />
      <WrapperWidgetUI title='Current Market Coverage'>
        <FormulaWidgetUI data={10.1} formatter={percentageFormatter} />
      </WrapperWidgetUI>
      <WrapperWidgetUI title='Competitor Market Coverage'>
        <FormulaWidgetUI data={89.9} formatter={percentageFormatter} />
      </WrapperWidgetUI>
      <WrapperWidgetUI title='Average Downloads Speed'>
        <HistogramWidgetUI
          data={[100, 50, 25, 12, 6, 3, 1]}
          dataAxis={[
            '10mbps',
            '20mbps',
            '30mbps',
            '40mbps',
            '50mbps',
            '60mbps',
            '70mbps',
          ]}
          yAxisFormatter={JSON.stringify}
          tooltipFormatter={([series]) => `Total: ${series.value}`}
        />
      </WrapperWidgetUI>
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
