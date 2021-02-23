import { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeckGL from '@deck.gl/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StaticMap } from 'react-map-gl';

import { makeStyles } from '@material-ui/core';

import { setViewState } from '@carto/react/redux';
import { BASEMAPS, GoogleMap } from '@carto/react/basemaps';
import { useNavigate } from 'react-router-dom';
import { THAILAND_ADMIN_LAYER_ID } from 'components/layers/ThailandAdminLayer';

import CapexOverlay from 'components/overlay/CapexOverlay';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    position: 'relative',
    height: `calc(100% - ${theme.spacing(2)}px)`,

    [theme.breakpoints.down('xs')]: {
      height: `calc(100% - ${theme.spacing(12) - 1}px)`, // Minus 1 to fix that weirdly sometimes the bottom sheet is 1px lower than needed
    },

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1),

      '& .mapboxgl-map, & #deckgl-overlay, & > div': {
        borderRadius: theme.spacing(0.5),
      },
    },
  },
  tooltip: {
    '& .content': {
      ...theme.typography.caption,
      position: 'relative',
      padding: theme.spacing(1, 1.5),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
      color: 'rgba(255, 255, 255, 0.75)', // TODO: Add emphasis colors to theme
      transform: `translate(-50%, calc(-100% - ${theme.spacing(2.5)}px))`,

      '& .arrow': {
        display: 'block',
        position: 'absolute',
        top: 'calc(100% - 1px)',
        left: '50%',
        width: 0,
        height: 0,
        marginLeft: theme.spacing(-1),
        borderLeft: `${theme.spacing(1)}px solid transparent`,
        borderRight: `${theme.spacing(1)}px solid transparent`,
        borderTop: `${theme.spacing(1)}px solid ${theme.palette.grey[900]}`,
      },
    },
  },
  popup: {
    '& .content': {
      ...theme.typography.caption,
      position: 'relative',
      padding: theme.spacing(1, 1.5),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.common.white,
      color: theme.palette.grey[900], // TODO: Add emphasis colors to theme
      transform: `translate(-50%, calc(-100% - ${theme.spacing(2.5)}px))`,

      '& .arrow': {
        display: 'block',
        position: 'absolute',
        top: 'calc(100% - 1px)',
        left: '50%',
        width: 0,
        height: 0,
        marginLeft: theme.spacing(-2),
        borderLeft: `${theme.spacing(2)}px solid transparent`,
        borderRight: `${theme.spacing(2)}px solid transparent`,
        borderTop: `${theme.spacing(2)}px solid ${theme.palette.common.white}`,
      },
    },
  },
}));

export function Map(props) {
  const deckRef = useRef(null);
  const ref = useRef(null);
  const navigate = useNavigate();
  const viewState = useSelector((state) => state.carto.viewState);
  const basemap = useSelector((state) => BASEMAPS[state.carto.basemap]);
  const googleApiKey = useSelector((state) => state.carto.googleApiKey);
  const dispatch = useDispatch();
  const classes = useStyles();
  let isHovering = false;
  let map;
  // Custom handleClick to allow selecting a
  // ThailandAdminLayer even if other layers are on top of it
  const handleClick = useCallback(
    (event) => {
      if (ref && deckRef) {
        // Need to offset clientX and clientY as for some reason
        // they are using the entire page
        const offsetX = ref.current.getBoundingClientRect().left;
        const offsetY = ref.current.getBoundingClientRect().top;
        const pickInfos = deckRef.current.pickObjects({
          x: event.clientX - offsetX,
          y: event.clientY - offsetY,
          layerIds: [THAILAND_ADMIN_LAYER_ID],
        });
        if (pickInfos) {
          const info = pickInfos[0];
          if (info?.object) {
            navigate(`/profiling/${info.object.properties.adm2_pcode}`);
          }
        }
      }
    },
    [ref, deckRef, navigate]
  );

  const handleViewStateChange = ({ viewState }) => {
    dispatch(setViewState(viewState));
  };

  const handleSizeChange = ({ width, height }) => {
    dispatch(setViewState({ width, height }));
  };

  const handleHover = ({ object }) => (isHovering = !!object);
  const handleCursor = ({ isDragging }) =>
    isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';

  const handleTooltip = (info) => {
    if (info?.object?.html) {
      return {
        html: `<div class='content'>${info.object.html}<div class='arrow'></div></div>`,
        className: classes.tooltip,
        style: {
          padding: 0,
          background: 'none',
        },
      };
    }
  };
  if (basemap.type === 'mapbox') {
    map = (
      <DeckGL
        ref={deckRef}
        viewState={{ ...viewState }}
        controller={true}
        layers={props.layers}
        onViewStateChange={handleViewStateChange}
        onResize={handleSizeChange}
        onHover={handleHover}
        getCursor={handleCursor}
        getTooltip={handleTooltip}
      >
        <CapexOverlay className={classes.popup} />
        <StaticMap
          reuseMaps
          mapStyle={basemap.options.mapStyle}
          preventStyleDiffing
        ></StaticMap>
      </DeckGL>
    );
  } else if (basemap.type === 'gmaps') {
    map = (
      <GoogleMap
        basemap={basemap}
        apiKey={googleApiKey}
        viewState={{ ...viewState }}
        layers={props.layers}
        onViewStateChange={handleViewStateChange}
        onResize={handleSizeChange}
        getTooltip={handleTooltip}
      ></GoogleMap>
    );
  } else {
    map = <div>Not a valid map provider</div>;
  }

  return (
    <div className={classes.root} ref={ref} onClick={handleClick}>
      {map}
    </div>
  );
}
