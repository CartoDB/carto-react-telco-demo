import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById, selectOAuthCredentials } from '@carto/react-redux';
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
export const LABELS = ['>200', '160-200', '120-160', '80-120', '40-80', '>40'];
export default function SociodemographicsLayer() {
  const { sociodemographicsLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, sociodemographicsLayer?.source)
  );
  const cartoFilterProps = useCartoLayerProps(source);
  const credentials = useSelector(selectOAuthCredentials);

  if (sociodemographicsLayer && source) {
    return new CartoSQLLayer({
      ...cartoFilterProps,
      id: SOCIODEMOGRAPHICS_LAYER_ID,
      data: source.data,
      credentials,
      getFillColor: (object) => {
        if (object.properties.ave_wvce_08 > 200) {
          return COLORS[0];
        } else if (object.properties.ave_wvce_08 > 160) {
          return COLORS[1];
        } else if (object.properties.ave_wvce_08 > 120) {
          return COLORS[2];
        } else if (object.properties.ave_wvce_08 > 80) {
          return COLORS[3];
        } else if (object.properties.ave_wvce_08 > 40) {
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
