import internetSpeedsSource from 'data/sources/internetSpeedsSource';

import { INTERNET_SPEEDS_LAYER_ID } from 'components/layers/InternetSpeedsLayer';
import populationSource from 'data/sources/populationSource';
import { addLayer, removeLayer } from '@carto/react-redux';

import { POPULATION_LAYER_ID } from 'components/layers/PopulationLayer';

import cellTowersSource from 'data/sources/cellTowersSource';

import { OPEN_CELL_ID_LAYER_ID } from 'components/layers/CellTowersLayer';
import marketCoverageSource from 'data/sources/marketCoverageSource';

import { MARKET_COVERAGE_LAYER_ID } from 'components/layers/MarketCoverageLayer';
import potentialRevenueSource from 'data/sources/potentialRevenueSource';

import { POTENTIAL_REVENUE_LAYER_ID } from 'components/layers/PotentialRevenueLayer';
import sociodemographicsSource from 'data/sources/sociodemographicsSource';

import { SOCIODEMOGRAPHICS_LAYER_ID } from 'components/layers/SociodemographicsLayer';
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

import experianLogo from 'assets/img/experian-logo.png';

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
  },
  title: {},
  label: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: '1.2rem',
  },
  link: {
    marginLeft: 'auto',
  },
  experianLogo: {
    width: '60px',
    verticalAlign: 'middle',
    marginRight: '10px',
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
  const setCellTowersLayer = (active) => {
    if (active) {
      dispatch(
        addLayer({
          id: OPEN_CELL_ID_LAYER_ID,
          source: cellTowersSource.id,
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
  const setSociodemographic = (active) => {
    if (active) {
      dispatch(
        addLayer({
          id: SOCIODEMOGRAPHICS_LAYER_ID,
          source: sociodemographicsSource.id,
        })
      );
    } else {
      dispatch(removeLayer(SOCIODEMOGRAPHICS_LAYER_ID));
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
              title="Population from Facebook's High Resolution Settlement Layer"
              placement='bottom'
            >
              <Grid
                className={classes.label}
                container
                direction='row'
                alignItems='center'
              >
                <Typography variant='body2'>Population</Typography>
              </Grid>
            </Tooltip>
          }
        />
        <Grid item className={classes.link}>
          <Link
            target='_blank'
            rel='noreferrer'
            href='//research.fb.com/downloads/high-resolution-settlement-layer-hrsl/'
          >
            <OpenInNewOutlinedIcon className={classes.icon} />
          </Link>
        </Grid>
      </Grid>
      <Grid container direction='row' alignItems='center'>
        <FormControlLabel
          control={
            <Checkbox
              checked={'cellTowersLayer' in activeLayers}
              name='Open Cell Id'
              onClick={(e) => setCellTowersLayer(e.target.checked)}
              color='primary'
            />
          }
          label={
            <Tooltip
              className={classes.tooltip}
              title='This data is a subset from OpenCelliD, but with dummy company data for the purpose of the Demo'
              placement='bottom'
            >
              <Grid
                className={classes.label}
                container
                direction='row'
                alignItems='center'
              >
                <Typography variant='body2'>Cell Towers</Typography>
              </Grid>
            </Tooltip>
          }
        />
        <Grid item className={classes.link}>
          <Link target='_blank' rel='noreferrer' href='//www.opencellid.org/stats.php'>
            <OpenInNewOutlinedIcon className={classes.icon} />
          </Link>
        </Grid>
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
              title="Dataset from Ookla's Speedtest Intelligence® data"
              placement='bottom'
            >
              <Grid
                className={classes.label}
                container
                direction='row'
                alignItems='center'
              >
                <Typography variant='body2'>Internet Speeds</Typography>
              </Grid>
            </Tooltip>
          }
        />
        <Grid item className={classes.link}>
          <Link
            target='_blank'
            rel='noreferrer'
            href='//registry.opendata.aws/speedtest-global-performance/'
          >
            <OpenInNewOutlinedIcon className={classes.icon} />
          </Link>
        </Grid>
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
              title='Population within 100m of a cell tower for each company'
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
              title='Population not covered by either company, within the adult age range, multiplied by the average monthly mobile subscription price (BHT 400)'
              placement='bottom'
            >
              <Grid container direction='row' alignItems='center'>
                <Typography variant='body2'>Potential Revenue</Typography>
              </Grid>
            </Tooltip>
          }
        />
      </Grid>
      <Grid container direction='row' alignItems='center'>
        <FormControlLabel
          control={
            <Checkbox
              checked={'sociodemographicsLayer' in activeLayers}
              name='sociodemographic'
              onClick={(e) => setSociodemographic(e.target.checked)}
              color='primary'
            />
          }
          label={
            <Tooltip
              className={classes.tooltip}
              title="Experian's Consumer Spending data (includes population and consumer segments)"
              placement='bottom'
            >
              <Grid container direction='row' alignItems='center'>
                <Typography variant='body2'>
                  <img
                    src={experianLogo}
                    className={classes.experianLogo}
                    alt='Experian '
                  />
                  Consumer Spending
                </Typography>
              </Grid>
            </Tooltip>
          }
        />
        <Grid item className={classes.link}>
          <Link
            target='_blank'
            rel='noreferrer'
            href='//carto.com/spatial-data-catalog/browser/dataset/expn_consumer_sp_3fff01d5/data/'
          >
            <OpenInNewOutlinedIcon className={classes.icon} />
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default LayerSelect;
