import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';

import renderInternetSpeedsTooltip from 'components/tooltip/internetSpeedsTooltip';

export const INTERNET_SPEEDS_LAYER_ID = 'internetSpeedsLayer';

export const COLORS = [
  [207, 89, 126, 128],
  [232, 133, 113, 128],
  [238, 180, 121, 128],
  [233, 226, 156, 128],
  [156, 203, 134, 128],
  [0, 147, 146, 128],
];
export const LABELS = ['>80', '60-80', '40-60', '20-40', '0-20', '0'];
export default function InternetSpeedsLayer() {
  const { internetSpeedsLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, internetSpeedsLayer?.source)
  );
  const cartoFilterProps = useCartoLayerProps(source);

  if (internetSpeedsLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: INTERNET_SPEEDS_LAYER_ID,
      data: source.data,
      maxZoom: 10,
      getFillColor: (object) => {
        // Apply color based on an attribute
        if (object.properties.mobile_avg_d_kbps > 80000) {
          return COLORS[0];
        } else if (object.properties.mobile_avg_d_kbps > 60000) {
          return COLORS[1];
        } else if (object.properties.mobile_avg_d_kbps > 40000) {
          return COLORS[2];
        } else if (object.properties.mobile_avg_d_kbps > 20000) {
          return COLORS[3];
        } else if (object.properties.mobile_avg_d_kbps > 0) {
          return COLORS[4];
        } else {
          return COLORS[5];
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
