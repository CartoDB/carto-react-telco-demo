import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import renderPopulationTooltip from 'components/tooltip/populationTooltip';
export const POPULATION_LAYER_ID = 'populationLayer';

export const COLORS = [
  [207, 89, 126, 128],
  [232, 133, 113, 128],
  [238, 180, 121, 128],
  [233, 226, 156, 128],
  [156, 203, 134, 128],
  [57, 177, 133, 128],
  [0, 147, 146, 128],
];
export const LABELS = [
  '>10M',
  '1M-10M',
  '100k-1M',
  '10k-100k',
  '1k-10k',
  '100-1k',
  '<100',
];

export default function PopulationLayer() {
  const { populationLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, populationLayer?.source));
  const cartoFilterProps = useCartoLayerProps(source);

  if (populationLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: POPULATION_LAYER_ID,
      data: source.data,
      getFillColor: (object) => {
        // Apply color based on an attribute
        if (object.properties.total_population > 10000000) {
          return COLORS[0];
        } else if (object.properties.total_population > 1000000) {
          return COLORS[1];
        } else if (object.properties.total_population > 100000) {
          return COLORS[2];
        } else if (object.properties.total_population > 10000) {
          return COLORS[3];
        } else if (object.properties.total_population > 1000) {
          return COLORS[4];
        } else if (object.properties.total_population > 100) {
          return COLORS[5];
        } else {
          return COLORS[6];
        }
      },
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: renderPopulationTooltip(info.object),
            style: {},
          };
        }
      },
    });
  }
}
