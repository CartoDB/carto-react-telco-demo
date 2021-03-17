import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById, selectOAuthCredentials } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';

import renderCellTowersTooltip from 'components/tooltip/cellTowersTooltip';
export const OPEN_CELL_ID_LAYER_ID = 'cellTowersLayer';

export const COLORS = [
  [36, 164, 240, 128],
  [255, 163, 70, 128],
];
export const LABELS = ['Company A', 'Company B'];

export default function CellTowersLayer() {
  const { cellTowersLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, cellTowersLayer?.source));
  const cartoFilterProps = useCartoLayerProps(source);
  const credentials = useSelector(selectOAuthCredentials);

  if (cellTowersLayer && source) {
    return new CartoSQLLayer({
      ...cartoFilterProps,
      id: OPEN_CELL_ID_LAYER_ID,
      data: source.data,
      credentials,
      getFillColor: (object) => {
        if (object.properties.network_operator === 'Company A') {
          return COLORS[0];
        } else if (object.properties.network_operator === 'Company B') {
          return COLORS[1];
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
            html: renderCellTowersTooltip(info.object),
            style: {},
          };
        }
      },
    });
  }
}
