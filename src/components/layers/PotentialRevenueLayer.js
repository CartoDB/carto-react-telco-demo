import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import renderPotentialRevenueTooltip from 'components/tooltip/potentialRevenueTooltip';

import { ORANGE_COLORS } from 'utils/colors';
export const POTENTIAL_REVENUE_LAYER_ID = 'potentialRevenueLayer';

export default function PotentialRevenueLayer() {
  const { potentialRevenueLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, potentialRevenueLayer?.source)
  );
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (potentialRevenueLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: POTENTIAL_REVENUE_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: (object) => {
        // Apply color based on an attribute
        if (object.properties.potential_revenue > 1658000) {
          return [...ORANGE_COLORS[0], 192];
        } else if (object.properties.potential_revenue > 973000) {
          return [...ORANGE_COLORS[1], 192];
        } else if (object.properties.potential_revenue > 515000) {
          return [...ORANGE_COLORS[2], 192];
        } else if (object.properties.potential_revenue > 204000) {
          return [...ORANGE_COLORS[3], 192];
        } else {
          return [...ORANGE_COLORS[4], 192];
        }
      },
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: renderPotentialRevenueTooltip(info.object),
            style: {},
          };
        }
      },
    });
  }
}
