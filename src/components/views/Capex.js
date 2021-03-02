import React from 'react';
import { useEffect } from 'react';
import summaryHexSource from 'data/sources/summaryHexSource';

import { SUMMARY_HEX_LAYER_ID } from 'components/layers/SummaryHexLayer';

import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
  updateLayer,
} from '@carto/react/redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Slider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    padding: theme.spacing(3, 3, 1.5),
  },
  sliderContainer: {
    padding: theme.spacing(3, 3, 1.5),
  },
  drawToolsContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3, 3, 1.5),
  },
  drawButton: {
    '&.MuiToggleButton-root': {
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      },
      color: theme.palette.primary.light,
      backgroundColor: theme.palette.primary.contrastText,
      border: `solid 2px ${theme.palette.primary.light}`,
    },
  },
  drawButtonContainer: {
    margin: 10,
  },
}));

export default function Capex() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [sliderValues, setSliderValues] = React.useState({
    totalPopulation: 100,
    maxRevenue: 300000,
  });

  useEffect(() => {
    dispatch(addSource(summaryHexSource));
    dispatch(
      addLayer({
        id: SUMMARY_HEX_LAYER_ID,
        source: summaryHexSource.id,
      })
    );

    return function cleanup() {
      dispatch(removeLayer(SUMMARY_HEX_LAYER_ID));
      dispatch(removeSource(summaryHexSource.id));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      updateLayer({
        id: SUMMARY_HEX_LAYER_ID,
        layerAttributes: { ...sliderValues },
      })
    );
  }, [sliderValues, dispatch]);

  // Auto import useEffect
  return (
    <Grid container direction='column' className={classes.root}>
      <Typography variant='h5' gutterBottom className={classes.title}>
        Smart Capex Investment
      </Typography>
      <Grid item className={classes.sliderContainer}>
        <Typography variant='h6'>Population: {sliderValues.totalPopulation}</Typography>
        <Slider
          min={0}
          max={5000}
          value={sliderValues.totalPopulation}
          onChange={(e, totalPopulation) =>
            setSliderValues((state) => ({ ...state, totalPopulation }))
          }
        />
      </Grid>
      <Grid item className={classes.sliderContainer}>
        <Typography variant='h6'>Potential Revenue: {sliderValues.maxRevenue}</Typography>
        <Slider
          min={0}
          max={3000000}
          value={sliderValues.maxRevenue}
          onChange={(e, maxRevenue) =>
            setSliderValues((state) => ({ ...state, maxRevenue }))
          }
        />
      </Grid>
    </Grid>
  );
}
