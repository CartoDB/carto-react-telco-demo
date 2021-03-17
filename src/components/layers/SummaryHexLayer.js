import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';

export const SUMMARY_HEX_LAYER_ID = 'summaryHexLayer';

const COLORS = [
  [6, 143, 232], //rgb(6, 143, 232)
  [74, 155, 235], //rgb(74, 155, 235)
  [106, 166, 238], //rgb(106, 166, 238)
  [132, 178, 240], //rgb(132, 178, 240)
  [155, 191, 243], //rgb(155, 191, 243)
  [176, 203, 246], //rgb(176, 203, 246)
  [197, 216, 248], //rgb(197, 216, 248)
  [217, 229, 251], //rgb(217, 229, 251)
  [236, 242, 253], //rgb(236, 242, 253)
  [255, 255, 255], //rgb(255, 255, 255)
];
const maxPopulationValue = 5000;
const maxNumCellTower = 100;

export default function SummaryHexLayer() {
  const { summaryHexLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, summaryHexLayer?.source));
  const cartoFilterProps = useCartoLayerProps(source);

  const getFillColor = useCallback(
    (object) => {
      if (summaryHexLayer) {
        const populationSlider = summaryHexLayer.totalPopulation || 100;
        const numOfCellTowersSlider = summaryHexLayer.numOfCellTowers || 10;
        const marketCoverageSlider = (summaryHexLayer.marketCoverage || 50) * 0.01;
        const competitorMarketCoverageSlider =
          (summaryHexLayer.competitorMarketCoverage || 50) * 0.01;
        const popDiff =
          ((object.properties.total_pop || 0) - populationSlider) / maxPopulationValue;
        const numOfCellTowerDiff =
          ((object.properties.num_celltowers || 0) - numOfCellTowersSlider) /
          maxNumCellTower;
        const marketCoverageDiff =
          (object.properties.market_share || 0) - marketCoverageSlider;
        const competitorMarketCoverageDiff =
          (object.properties.competitor_market_share || 0) -
          competitorMarketCoverageSlider;
        const distance = Math.hypot(
          popDiff,
          numOfCellTowerDiff,
          marketCoverageDiff,
          competitorMarketCoverageDiff
        );
        const color = COLORS[Math.round(distance * 10)];
        return color ? color : COLORS[9];
      }
    },
    [summaryHexLayer]
  );
  if (summaryHexLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: SUMMARY_HEX_LAYER_ID,
      data: source.data,
      pointRadiusMinPixels: 2,
      pickable: true,
      getFillColor: getFillColor,
      updateTriggers: {
        getFillColor: getFillColor,
      },
      onHover: () => {},
    });
  }
}
