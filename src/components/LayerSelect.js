import React from 'react';
import internetSpeedsSource from 'data/sources/internetSpeedsSource';

import { INTERNET_SPEEDS_LAYER_ID } from 'components/layers/InternetSpeedsLayer';
import populationSource from 'data/sources/populationSource';
import { addLayer, removeLayer } from '@carto/react/redux';

import { POPULATION_LAYER_ID } from 'components/layers/PopulationLayer';

import openCellIdSource from 'data/sources/openCellIdSource';

import { OPEN_CELL_ID_LAYER_ID } from 'components/layers/OpenCellIdLayer';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

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
      </Grid>
    </Paper>
  );
}

export default LayerSelect;
