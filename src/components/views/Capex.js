import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Slider, Typography, Button } from '@material-ui/core';
import { PIN_LAYER_ID } from 'components/layers/PinLayer';
import { addLayer, removeLayer, updateLayer } from '@carto/react/redux';

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
  const [value, setValue] = React.useState(1000);

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
        layerAttributes: { radius: value },
      })
    );
  }, [value, dispatch]);
  // Auto import useEffect

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container direction='column' className={classes.root}>
      <Typography variant='h5' gutterBottom className={classes.title}>
        Smart Capex Investment
      </Typography>
      <Grid item className={classes.sliderContainer}>
        <Typography variant='h6'>Radius: {value}m</Typography>
        <Slider
          min={1000}
          max={10000}
          value={value}
          onChange={handleChange}
          aria-labelledby='continuous-slider'
        />
      </Grid>
      <Grid item className={classes.sliderContainer}>
        <Button variant='contained' color='primary'>
          Load Radius
        </Button>
      </Grid>
    </Grid>
  );
}
