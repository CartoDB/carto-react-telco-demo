import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';

import renderInternetSpeedsTooltip from 'components/tooltip/internetSpeedsTooltip';

export const INTERNET_SPEEDS_LAYER_ID = 'internetSpeedsLayer';

const COLORS = {
  ONE_MILLION: [207, 89, 126, 128],
  HUNDRED_THOUSAND: [232, 133, 113, 128],
  TEN_THOUSAND: [238, 180, 121, 128],
  THOUSAND: [233, 226, 156, 128],
  HUNDRED: [156, 203, 134, 128],
  TEN: [57, 177, 133, 128],
  OTHER: [0, 147, 146, 128],
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
      maxZoom: 10,
      getFillColor: (object) => {
        // Apply color based on an attribute
        if (object.properties.mobile_avg_d_kbps > 80000) {
          return COLORS.ONE_MILLION;
        } else if (object.properties.mobile_avg_d_kbps > 60000) {
          return COLORS.HUNDRED_THOUSAND;
        } else if (object.properties.mobile_avg_d_kbps > 40000) {
          return COLORS.TEN_THOUSAND;
        } else if (object.properties.mobile_avg_d_kbps > 20000) {
          return COLORS.THOUSAND;
        } else if (object.properties.mobile_avg_d_kbps > 0) {
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
            html: renderInternetSpeedsTooltip(info.object),
            style: {},
          };
        }
      },
    });
  }
}
