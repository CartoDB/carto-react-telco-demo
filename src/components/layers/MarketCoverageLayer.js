import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import renderMarketCoverageTooltip from 'components/tooltip/marketCoverageTooltip';

export const MARKET_COVERAGE_LAYER_ID = 'marketCoverageLayer';

export const COLORS = [
  [6, 143, 232, 128], //rgb(6, 143, 232)
  [106, 166, 238, 128], //rgb(106, 166, 238)
  [155, 191, 243, 128], //rgb(155, 191, 243)
  [197, 216, 248, 128], //rgb(197, 216, 248)
  [236, 242, 253, 128], //rgb(236, 242, 253)
];
export const LABELS = ['>60%', '37%-60%', '19%-37%', '6%-19%', '0%-6%'];
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
          return COLORS[0];
        } else if (object.properties.market_share > 0.371) {
          return COLORS[1];
        } else if (object.properties.market_share > 0.197) {
          return COLORS[2];
        } else if (object.properties.market_share > 0.063) {
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
            html: renderMarketCoverageTooltip(info.object),
            style: {},
          };
        }
      },
    });
  }
}
