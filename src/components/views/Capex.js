import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Slider,
  Typography,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import { PIN_LAYER_ID } from 'components/layers/PinLayer';
import { addLayer, removeLayer, updateLayer, setError } from '@carto/react/redux';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import { getSummaryOfPoint } from 'data/models/capexSummary';
const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    padding: theme.spacing(3, 3, 1.5),
  },
  sliderContainer: {
    padding: theme.spacing(3, 3, 1.5),
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
    setDrawMode(event.target.checked);
    dispatch(
      updateLayer({
        id: PIN_LAYER_ID,
        layerAttributes: { draw: event.target.checked },
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
        dispatch(setError(`getSummaryofPoint error: ${error.message}`));
      });
  };
  return (
    <Grid container direction='column' className={classes.root}>
      <Typography variant='h5' gutterBottom className={classes.title}>
        Smart Capex Investment
      </Typography>
      <Grid className={classes.sliderContainer}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch checked={drawMode} onChange={handleToggleDraw} name='Draw mode' />
            }
            label={'Drop center of radius'}
          />
        </FormGroup>
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
          Load Radius
        </Button>
      </Grid>
    </Grid>
  );
}
