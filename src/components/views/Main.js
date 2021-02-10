import { useRef } from 'react';
import internetSpeedsSource from 'data/sources/internetSpeedsSource';

import { INTERNET_SPEEDS_LAYER_ID } from 'components/layers/InternetSpeedsLayer';

import populationSource from 'data/sources/populationSource';

import { POPULATION_LAYER_ID } from 'components/layers/PopulationLayer';

import { useEffect } from 'react';
import openCellIdSource from 'data/sources/openCellIdSource';

import { OPEN_CELL_ID_LAYER_ID } from 'components/layers/OpenCellIdLayer';

import { addLayer, removeLayer, addSource, removeSource } from '@carto/react/redux';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  SwipeableDrawer,
  Fab,
  Grid,
  Hidden,
  Portal,
  Snackbar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { GeocoderWidget } from '@carto/react/widgets';
import { BASEMAPS } from '@carto/react/basemaps';
import { Map } from 'components/common/Map';
import { ZoomControl } from 'components/common/ZoomControl';
import { getLayers } from 'components/layers';
import { setBottomSheetOpen, setError } from 'config/appSlice';
import cartoLogo from 'assets/img/carto-logo-map.svg';

import LayerSelect from 'components/LayerSelect';
const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  widgetDrawerToggle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
    textAlign: 'center',
  },
  bottomSheet: {
    maxHeight: `calc(100% - ${theme.spacing(6)}px)`,

    '&$closed': {
      transform: `translateY(calc(100% - ${theme.spacing(12)}px)) !important`,
      visibility: 'visible !important',

      '& $bottomSheetContent': {
        overflow: 'hidden',
      },
    },
  },
  closed: {},
  bottomSheetContent: {
    minHeight: theme.spacing(18),
    '& > *': {
      paddingBottom: theme.spacing(6),
    },
  },
  bottomSheetButton: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(2),
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    transform: `translateY(${theme.spacing(3)}px)`,
    transition: `transform ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms`,

    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },

    '& .MuiFab-label': {
      width: theme.spacing(9),
      justifyContent: 'flex-start',
    },

    '&$buttonShow': {
      transform: 'translateY(0)',

      '& $bottomSheetIcon': {
        transform: 'rotate(0)',
      },
    },
  },
  bottomSheetIcon: {
    color: theme.palette.text.hint,
    height: theme.spacing(4),
    transform: 'rotate(180deg)',
  },
  buttonShow: {},
  mapWrapper: {
    position: 'relative',
    flex: 1,
    overflow: 'hidden',

    // Fix Mapbox attribution button not clickable
    '& #deckgl-wrapper': {
      '& #deckgl-overlay': {
        zIndex: 1,
      },
      '& #view-default-view > div': {
        zIndex: 'auto !important',
      },
    },
  },
  geocoder: {
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(4),
    zIndex: 1,

    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(2),
      left: theme.spacing(2),
      width: `calc(100% - ${theme.spacing(4)}px)`,
    },
  },
  zoomControl: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    zIndex: 1,

    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(4),
      left: theme.spacing(2),
    },
  },
  cartoLogo: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: '50%',
    transform: 'translateX(-50%)',

    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(4.75),
    },

    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(13.5),
    },
  },
  gmaps: {
    '& $zoomControl': {
      left: theme.spacing(4),
      bottom: theme.spacing(5),
    },
  },
  layerSelect: {
    position: 'absolute',
    right: theme.spacing(4),
    top: theme.spacing(4),
  },
}));

export default function Main() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.app.error);
  const bottomSheetOpen = useSelector((state) => state.app.bottomSheetOpen);
  const isGmaps = useSelector((state) => BASEMAPS[state.carto.basemap].type === 'gmaps');
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const mobileContainer = useRef(null);
  const desktopContainer = useRef(null);

  useEffect(() => {
    dispatch(addSource(openCellIdSource));

    // dispatch(
    //   addLayer({
    //     id: OPEN_CELL_ID_LAYER_ID,
    //     source: openCellIdSource.id,
    //   })
    // );

    return function cleanup() {
      dispatch(removeLayer(OPEN_CELL_ID_LAYER_ID));
      dispatch(removeSource(openCellIdSource.id));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addSource(populationSource));

    // dispatch(
    //   addLayer({
    //     id: POPULATION_LAYER_ID,
    //     source: populationSource.id,
    //   })
    // );

    return function cleanup() {
      dispatch(removeLayer(POPULATION_LAYER_ID));
      dispatch(removeSource(populationSource.id));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addSource(internetSpeedsSource));

    dispatch(
      addLayer({
        id: INTERNET_SPEEDS_LAYER_ID,
        source: internetSpeedsSource.id,
      })
    );

    return function cleanup() {
      dispatch(removeLayer(INTERNET_SPEEDS_LAYER_ID));
      dispatch(removeSource(internetSpeedsSource.id));
    };
  }, [dispatch]);

  // Auto import useEffect

  const handleClose = () => {
    dispatch(setError(null));
  };

  const handleWidgetsDrawerToggle = () => {
    dispatch(setBottomSheetOpen(!bottomSheetOpen));
  };

  const onGeocoderWidgetError = (error) => {
    dispatch(setError(`Geocoding error: ${error.message}`));
  };

  return (
    <Grid container direction='row' alignItems='stretch' item xs>
      <nav className={classes.drawer}>
        <Portal container={isMobile ? mobileContainer.current : desktopContainer.current}>
          <Outlet />
        </Portal>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            PaperProps={{
              elevation: 8,
            }}
            open
          >
            <Toolbar variant='dense' />
            <Grid container item xs ref={desktopContainer}></Grid>
          </Drawer>
        </Hidden>
        <Hidden smUp implementation='css'>
          <SwipeableDrawer
            variant='persistent'
            anchor='bottom'
            open={bottomSheetOpen}
            onOpen={handleWidgetsDrawerToggle}
            onClose={handleWidgetsDrawerToggle}
            PaperProps={{
              className: `${classes.bottomSheet} ${
                !bottomSheetOpen ? classes.closed : ''
              }`,
              elevation: 8,
            }}
          >
            <div ref={mobileContainer} className={classes.bottomSheetContent}></div>
          </SwipeableDrawer>
          <Fab
            variant='extended'
            size='small'
            color='inherit'
            aria-label={bottomSheetOpen ? 'Hide' : 'Show'}
            className={`${classes.bottomSheetButton} ${
              !bottomSheetOpen ? classes.buttonShow : ''
            }`}
            onClick={handleWidgetsDrawerToggle}
          >
            <ExpandLessIcon className={classes.bottomSheetIcon} />
            {bottomSheetOpen ? 'Hide' : 'Show'}
          </Fab>
        </Hidden>
      </nav>

      <Grid item className={`${classes.mapWrapper} ${isGmaps ? classes.gmaps : ''}`}>
        <Map layers={getLayers()} />
        <GeocoderWidget className={classes.geocoder} onError={onGeocoderWidgetError} />
        <LayerSelect className={classes.layerSelect} />
        <Hidden xsDown>
          <ZoomControl className={classes.zoomControl} />
        </Hidden>
        {!isGmaps && <img src={cartoLogo} alt='CARTO' className={classes.cartoLogo} />}
      </Grid>

      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity='error'>{error}</Alert>
      </Snackbar>
    </Grid>
  );
}
