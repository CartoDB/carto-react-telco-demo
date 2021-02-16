import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import htmlForFeature from 'utils/htmlForFeature';

export const POPULATION_LAYER_ID = 'populationLayer';

const COLORS = {
  ONE_MILLION: [207, 89, 126],
  HUNDRED_THOUSAND: [232, 133, 113],
  TEN_THOUSAND: [238, 180, 121],
  THOUSAND: [233, 226, 156],
  HUNDRED: [156, 203, 134],
  TEN: [57, 177, 133],
  OTHER: [0, 147, 146],
};

export default function PopulationLayer() {
  const { populationLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, populationLayer?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (populationLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: POPULATION_LAYER_ID,
      data: source.data,
      getFillColor: (object) => {
        // Apply color based on an attribute
        if (object.properties.total_population > 10000000) {
          return COLORS.ONE_MILLION;
        } else if (object.properties.total_population > 1000000) {
          return COLORS.HUNDRED_THOUSAND;
        } else if (object.properties.total_population > 100000) {
          return COLORS.TEN_THOUSAND;
        } else if (object.properties.total_population > 10000) {
          return COLORS.THOUSAND;
        } else if (object.properties.total_population > 1000) {
          return COLORS.HUNDRED;
        } else if (object.properties.total_population > 100) {
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
