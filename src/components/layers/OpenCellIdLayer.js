import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import htmlForFeature from 'utils/htmlForFeature';

export const OPEN_CELL_ID_LAYER_ID = 'openCellIdLayer';

export default function OpenCellIdLayer() {
  const { openCellIdLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, openCellIdLayer?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (openCellIdLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: OPEN_CELL_ID_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature(info.object),
            style: {},
          };
        }
      },
    });
  }
}
