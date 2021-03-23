import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
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
export const LABELS = ['>300', '280-300', '260-280', '240-260', '220-240', '<220'];
export default function SociodemographicsLayer() {
  const { sociodemographicsLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, sociodemographicsLayer?.source)
  );
  const cartoFilterProps = useCartoLayerProps(source);

  if (sociodemographicsLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: SOCIODEMOGRAPHICS_LAYER_ID,
      data: source.data,
      getFillColor: (object) => {
        if (object.properties.avg_wvce_08_hh > 300) {
          return COLORS[0];
        } else if (object.properties.avg_wvce_08_hh > 280) {
          return COLORS[1];
        } else if (object.properties.avg_wvce_08_hh > 260) {
          return COLORS[2];
        } else if (object.properties.avg_wvce_08_hh > 240) {
          return COLORS[3];
        } else if (object.properties.avg_wvce_08_hh > 220) {
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
            html: renderSociodemographicsTooltip(info.object),
            style: {},
          };
        }
      },
    });
  }
}
