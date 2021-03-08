import { useEffect } from 'react';
import potentialRevenueSource from 'data/sources/potentialRevenueSource';

import { POTENTIAL_REVENUE_LAYER_ID } from 'components/layers/PotentialRevenueLayer';

import marketCoverageSource from 'data/sources/marketCoverageSource';

import { MARKET_COVERAGE_LAYER_ID } from 'components/layers/MarketCoverageLayer';
import populationSource from 'data/sources/populationSource';
import { POPULATION_LAYER_ID } from 'components/layers/PopulationLayer';
import internetSpeedsSource from 'data/sources/internetSpeedsSource';
import { INTERNET_SPEEDS_LAYER_ID } from 'components/layers/InternetSpeedsLayer';
import openCellIdSource from 'data/sources/openCellIdSource';
import { OPEN_CELL_ID_LAYER_ID } from 'components/layers/OpenCellIdLayer';

import { setError } from 'config/appSlice';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { removeLayer, addSource, removeSource, addLayer } from '@carto/react/redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  numberFormatter,
  internetSpeedFormatter,
  percentageFormatter,
} from 'utils/formatter';

import {
  AggregationTypes,
  FormulaWidget,
  HistogramWidget,
  CategoryWidget,
} from '@carto/react/widgets';
const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    padding: theme.spacing(3, 3, 1.5),
  },
}));
function Profiling() {
  const dispatch = useDispatch();
  const {
    populationLayer,
    internetSpeedsLayer,
    openCellIdLayer,
    marketCoverageLayer,
    potentialRevenueLayer,
  } = useSelector((state) => state.carto.layers);

  useEffect(() => {
    dispatch(addSource(openCellIdSource));

    // dispatch(
    //   addLayer({
    //     id: OPEN_CELL_ID_LAYER_ID,
    //     source: openCellIdSource.id,
    //   })
    // );

    return function cleanup() {
      dispatch(removeLayer(OPEN_CELL_ID_LAYER_ID));
      dispatch(removeSource(openCellIdSource.id));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addSource(internetSpeedsSource));

    // dispatch(
    //   addLayer({
    //     id: INTERNET_SPEEDS_LAYER_ID,
    //     source: internetSpeedsSource.id,
    //   })
    // );

    return function cleanup() {
      dispatch(removeLayer(INTERNET_SPEEDS_LAYER_ID));
      dispatch(removeSource(internetSpeedsSource.id));
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(addSource(populationSource));
    dispatch(
      addLayer({
        id: POPULATION_LAYER_ID,
        source: populationSource.id,
      })
    );

    return function cleanup() {
      dispatch(removeLayer(POPULATION_LAYER_ID));
      dispatch(removeSource(populationSource.id));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addSource(marketCoverageSource));

    // dispatch(
    //   addLayer({
    //     id: MARKET_COVERAGE_LAYER_ID,
    //     source: marketCoverageSource.id,
    //   })
    // );

    return function cleanup() {
      dispatch(removeLayer(MARKET_COVERAGE_LAYER_ID));
      dispatch(removeSource(marketCoverageSource.id));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addSource(potentialRevenueSource));

    // dispatch(
    //   addLayer({
    //     id: POTENTIAL_REVENUE_LAYER_ID,
    //     source: potentialRevenueSource.id,
    //   })
    // );

    return function cleanup() {
      dispatch(removeLayer(POTENTIAL_REVENUE_LAYER_ID));
      dispatch(removeSource(potentialRevenueSource.id));
    };
  }, [dispatch]);

  // Auto import useEffect
  const onTotalPopulationWidgetError = (error) => {
    dispatch(setError(`Error obtaining total population: ${error.message}`));
  };
  const classes = useStyles();
  return (
    <Grid container direction='column' className={classes.root}>
      <Typography variant='h5' gutterBottom className={classes.title}>
        Geographic Profiling
      </Typography>
      {populationLayer ? (
        <>
          <FormulaWidget
            id='totalPopulation'
            title='Total Population'
            dataSource={populationSource.id}
            column='total_population'
            operation={AggregationTypes.SUM}
            onError={onTotalPopulationWidgetError}
            formatter={numberFormatter}
            viewportFilter
          />
          <FormulaWidget
            id='totalPopulationCompanyA'
            title='Total Population Covered'
            dataSource={populationSource.id}
            column='companyA_population'
            operation={AggregationTypes.SUM}
            onError={onTotalPopulationWidgetError}
            formatter={numberFormatter}
            viewportFilter
          />
          <HistogramWidget
            id='populationDensity'
            title='Population Density'
            dataSource={populationSource.id}
            column='total_population'
            operation={AggregationTypes.COUNT}
            ticks={[0, 10, 100, 1000, 10000]}
            onError={onTotalPopulationWidgetError}
            formatter={numberFormatter}
            viewportFilter
          />
        </>
      ) : null}

      {openCellIdLayer ? (
        <>
          <CategoryWidget
            id='cellIdCompanies'
            title='Cell tower by Companies'
            dataSource={openCellIdSource.id}
            column='network_operator'
            operation={AggregationTypes.COUNT}
            onError={onTotalPopulationWidgetError}
            formatter={numberFormatter}
            viewportFilter
          />
          <CategoryWidget
            id='cellIdRadio'
            title='Cell tower by Technology'
            dataSource={openCellIdSource.id}
            column='radio'
            operation={AggregationTypes.COUNT}
            onError={onTotalPopulationWidgetError}
            formatter={numberFormatter}
            viewportFilter
          />
        </>
      ) : null}
      {internetSpeedsLayer ? (
        <>
          <HistogramWidget
            id='internetSpeedUploadFixed'
            title='Fixed Download Speeds'
            dataSource={internetSpeedsSource.id}
            column='fixed_avg_d_kbps'
            operation={AggregationTypes.COUNT}
            ticks={[0, 90000, 180000, 270000, 360000]}
            onError={onTotalPopulationWidgetError}
            xAxisFormatter={internetSpeedFormatter}
            formatter={numberFormatter}
            viewportFilter
          />
          <HistogramWidget
            id='internetSpeedUploadFixed'
            title='Fixed Upload Speeds'
            dataSource={internetSpeedsSource.id}
            column='fixed_avg_u_kbps'
            operation={AggregationTypes.COUNT}
            ticks={[0, 90000, 180000, 270000, 360000]}
            onError={onTotalPopulationWidgetError}
            xAxisFormatter={internetSpeedFormatter}
            formatter={numberFormatter}
            viewportFilter
          />
          <HistogramWidget
            id='internetSpeedDownloadMobile'
            title='Mobile Download Speeds'
            dataSource={internetSpeedsSource.id}
            column='mobile_avg_d_kbps'
            operation={AggregationTypes.COUNT}
            ticks={[0, 20000, 40000, 60000, 80000]}
            onError={onTotalPopulationWidgetError}
            xAxisFormatter={internetSpeedFormatter}
            formatter={numberFormatter}
            viewportFilter
          />
          <HistogramWidget
            id='internetSpeedUploadMobile'
            title='Mobile Upload Speeds'
            dataSource={internetSpeedsSource.id}
            column='mobile_avg_u_kbps'
            operation={AggregationTypes.COUNT}
            ticks={[0, 20000, 40000, 60000, 80000]}
            onError={onTotalPopulationWidgetError}
            xAxisFormatter={internetSpeedFormatter}
            formatter={numberFormatter}
            viewportFilter
          />
        </>
      ) : null}
      {marketCoverageLayer ? (
        <>
          <FormulaWidget
            id='aveMarketCoverage'
            title='Average Market Coverage'
            dataSource={marketCoverageSource.id}
            column='market_share'
            operation={AggregationTypes.AVG}
            onError={onTotalPopulationWidgetError}
            formatter={percentageFormatter}
            xAxisFormatter={internetSpeedFormatter}
            viewportFilter
          />
          <HistogramWidget
            id='histogramMarketCoverage'
            title='Market Coverage'
            dataSource={marketCoverageSource.id}
            column='market_share'
            operation={AggregationTypes.COUNT}
            ticks={[0, 0.2, 0.4, 0.6]}
            onError={onTotalPopulationWidgetError}
            viewportFilter
            formatter={numberFormatter}
            xAxisFormatter={percentageFormatter}
          />
          <HistogramWidget
            id='histogramMarketCoverage'
            title='Competitor Market Coverage'
            dataSource={marketCoverageSource.id}
            column='competitor_market_share'
            operation={AggregationTypes.COUNT}
            ticks={[0, 0.2, 0.4, 0.6]}
            onError={onTotalPopulationWidgetError}
            viewportFilter
            formatter={numberFormatter}
            xAxisFormatter={percentageFormatter}
          />
        </>
      ) : null}
      {potentialRevenueLayer ? (
        <>
          <FormulaWidget
            id='totalPotentialRevenue'
            title='Total Potential Revenue'
            dataSource={potentialRevenueSource.id}
            column='potential_revenue'
            operation={AggregationTypes.SUM}
            onError={onTotalPopulationWidgetError}
            formatter={numberFormatter}
            viewportFilter
          />
          <CategoryWidget
            id='revenueTier'
            title='Revenue Tier'
            dataSource={potentialRevenueSource.id}
            column='tier'
            operation={AggregationTypes.COUNT}
            onError={onTotalPopulationWidgetError}
            formatter={numberFormatter}
            viewportFilter
          />
        </>
      ) : null}
    </Grid>
  );
}

export default Profiling;
