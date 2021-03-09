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
import { Grid, Typography, Slider, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiTypography-h6': {
      fontSize: '1rem',
    },
  },
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
  body: {
    padding: theme.spacing(1, 3, 0.5),
  },
  slider: {
    display: 'flex',
    flexDirection: 'row',
  },
  sliderName: {
    color: theme.palette.grey[700],
  },
  sliderValue: {
    display: 'inline',
    width: 50,
    textAlign: 'right',
  },
}));

export default function Capex() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [sliderValues, setSliderValues] = React.useState({
    totalPopulation: 100,
    maxRevenue: 300000,
    numOfCellTowers: 10,
    marketCoverage: 50,
    competitorMarketCoverage: 50,
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
      <Typography variant='body2' className={classes.body}>
        Move the sliders to create your ideal location!
      </Typography>
      <Typography variant='body2' className={classes.body}>
        The more blue the color of a tile, the more similar it is to your ideal profile.
      </Typography>
      <Grid item className={classes.sliderContainer}>
        <Typography className={classes.sliderName} variant='subtitle2'>
          Population
        </Typography>
        <Box className={classes.slider}>
          <Slider
            min={0}
            max={5000}
            value={sliderValues.totalPopulation}
            onChange={(e, totalPopulation) =>
              setSliderValues((state) => ({ ...state, totalPopulation }))
            }
          />
          <Box className={classes.sliderValue}>
            <Typography variant='subtitle' style={{ verticalAlign: 'middle' }}>
              {sliderValues.totalPopulation}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item className={classes.sliderContainer}>
        <Typography className={classes.sliderName} variant='subtitle2'>
          Number of Cell Towers
        </Typography>
        <Box className={classes.slider}>
          <Slider
            min={0}
            max={100}
            value={sliderValues.numOfCellTowers}
            onChange={(e, numOfCellTowers) =>
              setSliderValues((state) => ({ ...state, numOfCellTowers }))
            }
          />
          <Box className={classes.sliderValue}>
            <Typography variant='subtitle' style={{ verticalAlign: 'middle' }}>
              {sliderValues.numOfCellTowers}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item className={classes.sliderContainer}>
        <Typography className={classes.sliderName} variant='subtitle2'>
          Market Coverage Percent
        </Typography>
        <Box className={classes.slider}>
          <Slider
            min={0}
            max={100}
            value={sliderValues.marketCoverage}
            onChange={(e, marketCoverage) =>
              setSliderValues((state) => ({ ...state, marketCoverage }))
            }
          />
          <Box className={classes.sliderValue}>
            <Typography variant='subtitle' style={{ verticalAlign: 'middle' }}>
              {sliderValues.marketCoverage} %
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item className={classes.sliderContainer}>
        <Typography className={classes.sliderName} variant='subtitle2'>
          Competitor Market Coverage Percent
        </Typography>
        <Box className={classes.slider}>
          <Slider
            min={0}
            max={100}
            value={sliderValues.competitorMarketCoverage}
            onChange={(e, competitorMarketCoverage) =>
              setSliderValues((state) => ({ ...state, competitorMarketCoverage }))
            }
          />
          <Box className={classes.sliderValue}>
            <Typography variant='subtitle' style={{ verticalAlign: 'middle' }}>
              {sliderValues.competitorMarketCoverage} %
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
