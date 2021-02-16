import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import { useNavigate } from 'react-router-dom';

export const THAILAND_ADMIN_LAYER_ID = 'thailandAdminLayer';

export default function ThailandAdminLayer() {
  const { thailandAdminLayer } = useSelector((state) => state.carto.layers);
  const navigate = useNavigate();
  const source = useSelector((state) =>
    selectSourceById(state, thailandAdminLayer?.source)
  );
  const cartoFilterProps = useCartoLayerFilterProps(source);

  const getLineColor = useCallback(
    (f) => {
      return f.properties.adm3_pcode_key === thailandAdminLayer.selectedAdmin
        ? [255, 0, 0]
        : [0, 0, 0, 0];
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
      onClick: (info) => {
        if (info?.object) {
          navigate(`/profiling/${info.object.properties.adm3_pcode_key}`);
        }
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
