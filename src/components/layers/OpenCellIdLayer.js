import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';

import renderOpenCellIdTooltip from 'components/tooltip/openCellIdTooltip';
import { PICTON_BLUE, YELLOW_ORANGE } from 'utils/colors';
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
        if (object.properties.network_operator === 'Company A') {
          return [...PICTON_BLUE.rgbArray, 128];
        } else if (object.properties.network_operator === 'Company B') {
          return [...YELLOW_ORANGE.rgbArray, 128];
        } else {
          return [0, 0, 0, 128];
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
