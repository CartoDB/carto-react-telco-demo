import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import renderMarketCoverageTooltip from 'components/tooltip/marketCoverageTooltip';
import { BLUE_COLORS } from 'utils/colors';

export const MARKET_COVERAGE_LAYER_ID = 'marketCoverageLayer';

export default function MarketCoverageLayer() {
  const { marketCoverageLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, marketCoverageLayer?.source)
  );
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (marketCoverageLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: MARKET_COVERAGE_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: (object) => {
        // Apply color based on an attribute
        if (object.properties.market_share > 0.6) {
          return [...BLUE_COLORS[0], 192];
        } else if (object.properties.market_share > 0.371) {
          return [...BLUE_COLORS[2], 192];
        } else if (object.properties.market_share > 0.197) {
          return [...BLUE_COLORS[4], 192];
        } else if (object.properties.market_share > 0.063) {
          return [...BLUE_COLORS[6], 192];
        } else {
          return [...BLUE_COLORS[9], 192];
        }
      },
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: renderMarketCoverageTooltip(info.object),
            style: {},
          };
        }
      },
    });
  }
}
