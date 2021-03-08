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
import Link from '@material-ui/core/Link';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import OpenInNewOutlinedIcon from '@material-ui/icons/OpenInNewOutlined';
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
  tooltip: {
    margin: theme.spacing(1),
    maxWidth: 250,
  },
  title: {},
  label: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: '1.2rem',
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
      dispatch(removeLayer(POTENTIAL_REVENUE_LAYER_ID));
    }
  };
  if (location.pathname !== '/profiling') return null;
  return (
    <Paper className={`${props.className} ${classes.root}`} elevation={2}>
      <Typography className={classes.title} variant='body1'>
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
          label={
            <Tooltip
              className={classes.tooltip}
              title='Population is from Facebook HRSL'
              placement='bottom'
            >
              <Grid
                className={classes.label}
                container
                direction='row'
                alignItems='center'
                justify
              >
                <Typography variant='body2'>Population</Typography>
                <Link target='_blank' rel='noreferrer' href='//google.com'>
                  <OpenInNewOutlinedIcon className={classes.icon} />
                </Link>
              </Grid>
            </Tooltip>
          }
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
          label={
            <Tooltip
              className={classes.tooltip}
              title='Data is from Open Cell Id'
              placement='bottom'
            >
              <Grid
                className={classes.label}
                container
                direction='row'
                alignItems='center'
              >
                <Typography variant='body2'>Cell Towers</Typography>
                <Link target='_blank' rel='noreferrer' href='//google.com'>
                  <OpenInNewOutlinedIcon className={classes.icon} />
                </Link>
              </Grid>
            </Tooltip>
          }
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
          label={
            <Tooltip
              className={classes.tooltip}
              title='Internet Speeds are from ookla'
              placement='bottom'
            >
              <Grid
                className={classes.label}
                container
                direction='row'
                alignItems='center'
              >
                <Typography variant='body2'>Internet Speeds</Typography>
                <Link target='_blank' rel='noreferrer' href='//google.com'>
                  <OpenInNewOutlinedIcon className={classes.icon} />
                </Link>
              </Grid>
            </Tooltip>
          }
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
          label={
            <Tooltip
              className={classes.tooltip}
              title='Market Coverage is calculated by the following'
              placement='bottom'
            >
              <Grid container direction='row' alignItems='center'>
                <Typography variant='body2'>Market Coverage</Typography>
              </Grid>
            </Tooltip>
          }
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
          label={
            <Tooltip
              className={classes.tooltip}
              title='Potential Revenue is calculated by the following'
              placement='bottom'
            >
              <Grid container direction='row' alignItems='center'>
                <Typography variant='body2'>Potential Revenue</Typography>
              </Grid>
            </Tooltip>
          }
        />
      </Grid>
    </Paper>
  );
}

export default LayerSelect;
