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

import cellTowersSource from 'data/sources/cellTowersSource';
import { OPEN_CELL_ID_LAYER_ID } from 'components/layers/CellTowersLayer';

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
    cellTowersLayer,
    marketCoverageLayer,
    potentialRevenueLayer,
    sociodemographicsLayer,
  } = useSelector((state) => state.carto.layers);

  useEffect(() => {
    const source = { ...cellTowersSource, credentials };
    dispatch(addSource(source));

    return function cleanup() {
      dispatch(removeLayer(OPEN_CELL_ID_LAYER_ID));
      dispatch(removeSource(cellTowersSource.id));
    };
  }, [dispatch, credentials]);

  useEffect(() => {
    dispatch(addSource(internetSpeedsSource));

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

    return function cleanup() {
      dispatch(removeLayer(MARKET_COVERAGE_LAYER_ID));
      dispatch(removeSource(marketCoverageSource.id));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addSource(potentialRevenueSource));

    return function cleanup() {
      dispatch(removeLayer(POTENTIAL_REVENUE_LAYER_ID));
      dispatch(removeSource(potentialRevenueSource.id));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addSource(sociodemographicsSource));

    return function cleanup() {
      dispatch(removeLayer(SOCIODEMOGRAPHICS_LAYER_ID));
      dispatch(removeSource(sociodemographicsSource.id));
    };
  }, [dispatch]);

  const onWidgetError = (error) => {
    dispatch(setError(`Error in widget: ${error.message}`));
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
            onError={onWidgetError}
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
            onError={onWidgetError}
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
            onError={onWidgetError}
            formatter={numberFormatter}
            viewportFilter
          />
        </>
      ) : null}

      {cellTowersLayer ? (
        <>
          <Divider />
          <CategoryWidget
            id='cellIdCompanies'
            title='Cell tower by Companies'
            dataSource={cellTowersSource.id}
            column='network_operator'
            operation={AggregationTypes.COUNT}
            onError={onWidgetError}
            formatter={numberFormatter}
            viewportFilter
          />
          <Divider />
          <CategoryWidget
            id='cellIdRadio'
            title='Cell tower by Technology'
            dataSource={cellTowersSource.id}
            column='radio'
            operation={AggregationTypes.COUNT}
            onError={onWidgetError}
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
            onError={onWidgetError}
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
            onError={onWidgetError}
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
            onError={onWidgetError}
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
            onError={onWidgetError}
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
            onError={onWidgetError}
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
            onError={onWidgetError}
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
            onError={onWidgetError}
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
            onError={onWidgetError}
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
            onError={onWidgetError}
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
            onError={onWidgetError}
            formatter={euroFormatter}
            viewportFilter
          />
          <Divider />
          <PieWidget
            id='consumerSegment'
            title='Consumer Segment Breakdown'
            dataSource={sociodemographicsSource.id}
            column='wvseg'
            operation={AggregationTypes.COUNT}
            onError={onWidgetError}
            formatter={numberFormatter}
            viewportFilter
          />
          <Divider />
          <HistogramWidget
            id='totalPurchasingPower'
            title='Average Purchasing Power'
            dataSource={sociodemographicsSource.id}
            column='avg_di_mio'
            operation={AggregationTypes.COUNT}
            ticks={[3000, 4000, 5000, 6000, 7000]}
            onError={onWidgetError}
            viewportFilter
            formatter={numberFormatter}
            xAxisFormatter={numberFormatter}
          />
          <Divider />
          <HistogramWidget
            id='consumerExpenditureCommunication'
            title='Average Spend on Communications '
            dataSource={sociodemographicsSource.id}
            column='avg_wvce_08_hh'
            operation={AggregationTypes.COUNT}
            ticks={[220, 240, 260, 280, 300]}
            onError={onWidgetError}
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
