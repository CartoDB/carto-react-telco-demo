import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Slider, Typography, Button } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import { PIN_LAYER_ID } from 'components/layers/PinLayer';
import { addLayer, removeLayer, updateLayer, setError } from '@carto/react/redux';

import { getSummaryOfPoint } from 'data/models/capexSummary';

import PinDropIcon from '@material-ui/icons/PinDrop';

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pinLayer } = useSelector((state) => state.carto.layers);
  const credentials = useSelector((state) => state.carto.credentials);
  const [sliderValue, setSliderValue] = React.useState(1000);

  const [drawMode, setDrawMode] = React.useState(false);

  useEffect(() => {
    dispatch(
      addLayer({
        id: PIN_LAYER_ID,
      })
    );

    return function cleanup() {
      dispatch(removeLayer(PIN_LAYER_ID));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      updateLayer({
        id: PIN_LAYER_ID,
        layerAttributes: { radius: sliderValue, summaryData: null }, // reset summary data
      })
    );
  }, [sliderValue, dispatch]);
  // Auto import useEffect

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  const handleToggleDraw = (event) => {
    setDrawMode(!drawMode);
    dispatch(
      updateLayer({
        id: PIN_LAYER_ID,
        layerAttributes: { draw: !drawMode },
      })
    );
  };
  const loadData = () => {
    //insertAPICall
    getSummaryOfPoint({
      point: pinLayer.pointData.geometry,
      buffer: pinLayer.radius,
      credentials,
    })
      .then((data) => {
        dispatch(
          updateLayer({
            id: PIN_LAYER_ID,
            layerAttributes: { summaryData: data },
          })
        );
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        dispatch(setError(`getSummaryOfPoint error: ${error.message}`));
      });
  };
  return (
    <Grid container direction='column' className={classes.root}>
      <Typography variant='h5' gutterBottom className={classes.title}>
        Smart Capex Investment
      </Typography>
      <Grid className={classes.drawToolsContainer}>
        <div className={classes.drawButtonContainer}>
          <ToggleButton
            className={classes.drawButton}
            color='primary'
            variant='outlined'
            value='check'
            selected={drawMode}
            onChange={handleToggleDraw}
          >
            <PinDropIcon />
          </ToggleButton>
        </div>
        <Typography>Drop a pin to determine market potential of this area</Typography>
      </Grid>
      <Grid item className={classes.sliderContainer}>
        <Typography variant='h6'>Radius: {sliderValue}m</Typography>
        <Slider
          min={1000}
          max={10000}
          value={sliderValue}
          onChange={handleSliderChange}
        />
      </Grid>
      <Grid item className={classes.sliderContainer}>
        <Button variant='contained' color='primary' onClick={loadData}>
          Calculate Metrics
        </Button>
      </Grid>
    </Grid>
  );
}
