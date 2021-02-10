import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import htmlForFeature from 'utils/htmlForFeature';

export const POPULATION_LAYER_ID = 'populationLayer';

export default function PopulationLayer() {
  const { populationLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, populationLayer?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (populationLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: POPULATION_LAYER_ID,
      data: source.data,
      getFillColor: [119, 221, 119],
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
