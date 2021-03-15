import { useEffect } from 'react';
import sociodemographicsSource from 'data/sources/sociodemographicsSource';

import { SOCIODEMOGRAPHICS_LAYER_ID } from 'components/layers/SociodemographicsLayer';

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
import { Grid, Typography, Divider } from '@material-ui/core';
import {
  removeLayer,
  addSource,
  removeSource,
  addLayer,
  selectOAuthCredentials,
} from '@carto/react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  numberFormatter,
  internetSpeedFormatter,
  percentageFormatter,
  bahtFormatter,
  euroFormatter,
} from 'utils/formatter';

import {
  FormulaWidget,
  HistogramWidget,
  CategoryWidget,
  PieWidget,
} from '@carto/react-widgets';
import { AggregationTypes } from '@carto/react-core';
const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    padding: theme.spacing(3, 3, 1.5),
  },
}));
function Profiling() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectOAuthCredentials);
  const {
    populationLayer,
    internetSpeedsLayer,
    openCellIdLayer,
    marketCoverageLayer,
    potentialRevenueLayer,
    sociodemographicsLayer,
  } = useSelector((state) => state.carto.layers);

  useEffect(() => {
    const source = { ...openCellIdSource, credentials };
    dispatch(addSource(source));

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
  }, [dispatch, credentials]);

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

  useEffect(() => {
    const source = { ...sociodemographicsSource, credentials };
    dispatch(addSource(source));

    // dispatch(
    //   addLayer({
    //     id: SOCIODEMOGRAPHICS_LAYER_ID,
    //     source: sociodemographicsSource.id,
    //   })
    // );

    return function cleanup() {
      dispatch(removeLayer(SOCIODEMOGRAPHICS_LAYER_ID));
      dispatch(removeSource(sociodemographicsSource.id));
    };
  }, [dispatch, credentials]);

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
          <Divider />
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
          <Divider />
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
          <Divider />
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
          <Divider />
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
          <Divider />
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
          <Divider />
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
          <Divider />
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
          <Divider />
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
          <Divider />
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
          <Divider />
          <FormulaWidget
            id='aveMarketCoverage'
            title='Average Market Coverage'
            dataSource={marketCoverageSource.id}
            column='market_share'
            operation={AggregationTypes.AVG}
            onError={onTotalPopulationWidgetError}
            formatter={percentageFormatter}
            viewportFilter
          />
          <Divider />
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
            xAxisFormatter={(v) => percentageFormatter(v, 0)}
          />
          <Divider />
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
            xAxisFormatter={(v) => percentageFormatter(v, 0)}
          />
        </>
      ) : null}
      {potentialRevenueLayer ? (
        <>
          <Divider />
          <FormulaWidget
            id='totalPotentialRevenue'
            title='Total Potential Revenue'
            dataSource={potentialRevenueSource.id}
            column='potential_revenue'
            operation={AggregationTypes.SUM}
            onError={onTotalPopulationWidgetError}
            formatter={bahtFormatter}
            viewportFilter
          />
          <Divider />
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
      {sociodemographicsLayer ? (
        <>
          <Divider />
          <FormulaWidget
            id='consumerExpenditureOnCommunication'
            title='Total Spend on Communications'
            dataSource={sociodemographicsSource.id}
            column='wvce_08'
            operation={AggregationTypes.SUM}
            onError={onTotalPopulationWidgetError}
            formatter={euroFormatter}
            viewportFilter
          />
          <Divider />
          <PieWidget
            id='commonSegment'
            title='Consumer Segment Breakdown'
            dataSource={sociodemographicsSource.id}
            column='wvseg2'
            operation={AggregationTypes.COUNT}
            onError={onTotalPopulationWidgetError}
            formatter={numberFormatter}
            viewportFilter
          />
          <Divider />
          <HistogramWidget
            id='totalPurchasingPower'
            title='Average Purchasing Power'
            dataSource={sociodemographicsSource.id}
            column='ave_di_mio'
            operation={AggregationTypes.COUNT}
            ticks={[0, 1500, 3000, 4500, 6000]}
            onError={onTotalPopulationWidgetError}
            viewportFilter
            formatter={numberFormatter}
            xAxisFormatter={numberFormatter}
          />
          <Divider />
          <HistogramWidget
            id='consumerExpenditureCommunication'
            title='Average Spend on Communications '
            dataSource={sociodemographicsSource.id}
            column='ave_wvce_08'
            operation={AggregationTypes.COUNT}
            ticks={[0, 40, 80, 120, 160, 200]}
            onError={onTotalPopulationWidgetError}
            viewportFilter
            formatter={numberFormatter}
            xAxisFormatter={numberFormatter}
          />
        </>
      ) : null}
    </Grid>
  );
}

export default Profiling;
