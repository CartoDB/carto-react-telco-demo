import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import htmlForFeature from 'utils/htmlForFeature';

export const INTERNET_SPEEDS_LAYER_ID = 'internetSpeedsLayer';

const COLORS = {
  ONE_MILLION: [207, 89, 126],
  HUNDRED_THOUSAND: [232, 133, 113],
  TEN_THOUSAND: [238, 180, 121],
  THOUSAND: [233, 226, 156],
  HUNDRED: [156, 203, 134],
  TEN: [57, 177, 133],
  OTHER: [0, 147, 146],
};
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
      getFillColor: (object) => {
        // Apply color based on an attribute
        if (object.properties.avg_d_kbps > 100000) {
          return COLORS.ONE_MILLION;
        } else if (object.properties.avg_d_kbps > 50000) {
          return COLORS.HUNDRED_THOUSAND;
        } else if (object.properties.avg_d_kbps > 10000) {
          return COLORS.TEN_THOUSAND;
        } else if (object.properties.avg_d_kbps > 5000) {
          return COLORS.THOUSAND;
        } else if (object.properties.avg_d_kbps > 1000) {
          return COLORS.HUNDRED;
        } else if (object.properties.avg_d_kbps > 500) {
          return COLORS.TEN;
        } else {
          return COLORS.OTHER;
        }
      },
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
