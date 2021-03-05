import internetSpeedsSource from 'data/sources/internetSpeedsSource';

import { INTERNET_SPEEDS_LAYER_ID } from 'components/layers/InternetSpeedsLayer';
import populationSource from 'data/sources/populationSource';
import { addLayer, removeLayer } from '@carto/react/redux';

import { POPULATION_LAYER_ID } from 'components/layers/PopulationLayer';

import openCellIdSource from 'data/sources/openCellIdSource';

import { OPEN_CELL_ID_LAYER_ID } from 'components/layers/OpenCellIdLayer';
import marketCoverageSource from 'data/sources/marketCoverageSource';

import { MARKET_COVERAGE_LAYER_ID } from 'components/layers/MarketCoverageLayer';
import potentialRevenueSource from 'data/sources/potentialRevenueSource';

import { POTENTIAL_REVENUE_LAYER_ID } from 'components/layers/PotentialRevenueLayer';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.caption,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.common.white,
    '&:empty': {
      display: 'none',
    },
  },
  title: {
    display: 'block',
    marginBottom: theme.spacing(1),
  },
  element: {
    ...theme.typography.overline,
    textTransform: 'none',
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.25, 0),
  },
}));
export function LayerSelect({ ...props }) {
  const classes = useStyles();
  const activeLayers = useSelector((state) => state.carto.layers);
  const dispatch = useDispatch();
  const location = useLocation();
  const setPopulationLayer = (active) => {
    if (active) {
      dispatch(
        addLayer({
          id: POPULATION_LAYER_ID,
          source: populationSource.id,
        })
      );
    } else {
      dispatch(removeLayer(POPULATION_LAYER_ID));
    }
  };
  const setOpenCellIdLayer = (active) => {
    if (active) {
      dispatch(
        addLayer({
          id: OPEN_CELL_ID_LAYER_ID,
          source: openCellIdSource.id,
        })
      );
    } else {
      dispatch(removeLayer(OPEN_CELL_ID_LAYER_ID));
    }
  };
  const setInternetSpeeds = (active) => {
    if (active) {
      dispatch(
        addLayer({
          id: INTERNET_SPEEDS_LAYER_ID,
          source: internetSpeedsSource.id,
        })
      );
    } else {
      dispatch(removeLayer(INTERNET_SPEEDS_LAYER_ID));
    }
  };
  const setMarketCoverage = (active) => {
    if (active) {
      dispatch(
        addLayer({
          id: MARKET_COVERAGE_LAYER_ID,
          source: marketCoverageSource.id,
        })
      );
    } else {
      dispatch(removeLayer(MARKET_COVERAGE_LAYER_ID));
    }
  };
  const setPotentialRevenue = (active) => {
    if (active) {
      dispatch(
        addLayer({
          id: POTENTIAL_REVENUE_LAYER_ID,
          source: potentialRevenueSource.id,
        })
      );
    } else {
      dispatch(removeLayer(MARKET_COVERAGE_LAYER_ID));
    }
  };
  if (location.pathname !== '/profiling') return null;
  return (
    <Paper className={`${props.className} ${classes.root}`} elevation={2}>
      <Typography className={classes.title} variant='caption'>
        Layer Select
      </Typography>

      <Grid container direction='row' alignItems='center'>
        <FormControlLabel
          control={
            <Checkbox
              checked={'populationLayer' in activeLayers}
              name='Population '
              onClick={(e) => setPopulationLayer(e.target.checked)}
              color='primary'
            />
          }
          label='Population'
        />
      </Grid>
      <Grid container direction='row' alignItems='center'>
        <FormControlLabel
          control={
            <Checkbox
              checked={'openCellIdLayer' in activeLayers}
              name='Open Cell Id'
              onClick={(e) => setOpenCellIdLayer(e.target.checked)}
              color='primary'
            />
          }
          label='Open Cell Id'
        />
      </Grid>
      <Grid container direction='row' alignItems='center'>
        <FormControlLabel
          control={
            <Checkbox
              checked={'internetSpeedsLayer' in activeLayers}
              name='Internet Speeds'
              onClick={(e) => setInternetSpeeds(e.target.checked)}
              color='primary'
            />
          }
          label='Internet Speeds'
        />
      </Grid>
      <Grid container direction='row' alignItems='center'>
        <FormControlLabel
          control={
            <Checkbox
              checked={'marketCoverageLayer' in activeLayers}
              name='marketCoverage'
              onClick={(e) => setMarketCoverage(e.target.checked)}
              color='primary'
            />
          }
          label='Market Coverage'
        />
      </Grid>
      <Grid container direction='row' alignItems='center'>
        <FormControlLabel
          control={
            <Checkbox
              checked={'potentialRevenueLayer' in activeLayers}
              name='potentialRevenue'
              onClick={(e) => setPotentialRevenue(e.target.checked)}
              color='primary'
            />
          }
          label='Potential Revenue'
        />
      </Grid>
    </Paper>
  );
}

export default LayerSelect;
