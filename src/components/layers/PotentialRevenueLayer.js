import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import renderPotentialRevenueTooltip from 'components/tooltip/potentialRevenueTooltip';

export const POTENTIAL_REVENUE_LAYER_ID = 'potentialRevenueLayer';

export const COLORS = [
  [255, 163, 70, 128], //rgb(255, 163, 70)
  [255, 186, 117, 128], //rgb(255, 186, 117)
  [255, 208, 163, 128], // rgb(255, 208, 163)
  [255, 232, 208, 128], // rgb(255, 232, 208)
  [255, 255, 255, 128], // rgb(255, 255, 255)
];
export const LABELS = ['> 1.6M', '900K-1.6M', '500K-900K', '200K-500K', '<200K'];
export default function PotentialRevenueLayer() {
  const { potentialRevenueLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, potentialRevenueLayer?.source)
  );
  const cartoFilterProps = useCartoLayerProps(source);

  if (potentialRevenueLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: POTENTIAL_REVENUE_LAYER_ID,
      data: source.data,
      getFillColor: (object) => {
        // Apply color based on an attribute
        if (object.properties.potential_revenue > 1658000) {
          return COLORS[0];
        } else if (object.properties.potential_revenue > 973000) {
          return COLORS[1];
        } else if (object.properties.potential_revenue > 515000) {
          return COLORS[2];
        } else if (object.properties.potential_revenue > 204000) {
          return COLORS[3];
        } else {
          return COLORS[4];
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
