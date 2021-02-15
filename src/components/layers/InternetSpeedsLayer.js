import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import htmlForFeature from 'utils/htmlForFeature';

export const INTERNET_SPEEDS_LAYER_ID = 'internetSpeedsLayer';

export default function InternetSpeedsLayer() {
  const { internetSpeedsLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, internetSpeedsLayer?.source)
  );
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (internetSpeedsLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: INTERNET_SPEEDS_LAYER_ID,
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
