import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import renderSociodemographicsTooltip from 'components/tooltip/sociodemographicsTooltip';

export const SOCIODEMOGRAPHICS_LAYER_ID = 'sociodemographicsLayer';
export const COLORS = [
  [99, 88, 159, 128], //#63589f
  [130, 109, 186, 128], // #826dba
  [159, 130, 206, 128], // #9f82ce
  [185, 152, 221, 128], // #b998dd
  [209, 175, 232, 128], // #d1afe8
  [243, 224, 247, 128], //#f3e0f7,
];
export const LABELS = ['>100k', '80k-100k', '60k-80k', '40k-60k', '20k-40k', '<20k'];
export default function SociodemographicsLayer() {
  const { sociodemographicsLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, sociodemographicsLayer?.source)
  );
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (sociodemographicsLayer && source) {
    return new CartoSQLLayer({
      ...cartoFilterProps,
      id: SOCIODEMOGRAPHICS_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: (object) => {
        if (object.properties.wvce_08 > 100000) {
          return COLORS[0];
        } else if (object.properties.wvce_08 > 80000) {
          return COLORS[1];
        } else if (object.properties.wvce_08 > 60000) {
          return COLORS[2];
        } else if (object.properties.wvce_08 > 40000) {
          return COLORS[3];
        } else if (object.properties.wvce_08 > 20000) {
          return COLORS[4];
        } else {
          return COLORS[6];
        }
      },
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: renderSociodemographicsTooltip(info.object),
            style: {},
          };
        }
      },
    });
  }
}
