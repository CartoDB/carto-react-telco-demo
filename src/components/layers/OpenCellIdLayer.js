import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';

import renderOpenCellIdTooltip from 'components/tooltip/openCellIdTooltip';

export const OPEN_CELL_ID_LAYER_ID = 'openCellIdLayer';

export default function OpenCellIdLayer() {
  const { openCellIdLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, openCellIdLayer?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (openCellIdLayer && source) {
    return new CartoSQLLayer({
      ...cartoFilterProps,
      id: OPEN_CELL_ID_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: (object) => {
        if (object.properties.radio === 'LTE') {
          return [207, 89, 126];
        } else if (object.properties.radio === 'UMTS') {
          return [238, 180, 121];
        } else if (object.properties.radio === 'GSM') {
          return [156, 203, 134];
        } else {
          return [0, 147, 146];
        }
      },
      pointRadiusUnits: 'pixels',
      pointRadiusMinPixels: 5,
      pickable: true,

      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: renderOpenCellIdTooltip(info.object),
            style: {},
          };
        }
      },
    });
  }
}
