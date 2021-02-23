import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';

export const THAILAND_ADMIN_LAYER_ID = 'thailandAdminLayer';

export default function ThailandAdminLayer() {
  const { thailandAdminLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, thailandAdminLayer?.source)
  );
  const cartoFilterProps = useCartoLayerFilterProps(source);
  const getLineColor = useCallback(
    (f) => {
      return f.properties.adm2_pcode === thailandAdminLayer.selectedAdmin
        ? [255, 0, 0]
        : [0, 0, 0, 60];
    },
    [thailandAdminLayer]
  );
  if (thailandAdminLayer && source) {
    return new CartoSQLLayer({
      ...cartoFilterProps,
      id: THAILAND_ADMIN_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: [0, 0, 0, 0],
      getLineColor: getLineColor,
      lineWidthMinPixels: 2,
      lineWidthUnits: 'pixel',
      getLineWidth: 3,
      updateTriggers: {
        getLineColor: getLineColor,
      },
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {};
        }
      },
    });
  }
}
