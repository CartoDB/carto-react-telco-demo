import { useSelector, useDispatch } from 'react-redux';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import { DrawPointMode, ViewMode } from '@nebula.gl/edit-modes';
import { updateLayer } from '@carto/react/redux';
export const PIN_LAYER_ID = 'pinLayer';
export default function PinLayer() {
  const { pinLayer } = useSelector((state) => state.carto.layers);
  const dispatch = useDispatch();
  console.dir(pinLayer);
  const updatePointData = (updatedData) => {
    dispatch(
      updateLayer({
        id: PIN_LAYER_ID,
        layerAttributes: { summaryData: null, pointData: updatedData }, // If there is a new point drop the summaryData
      })
    );
  };
  if (pinLayer) {
    return new EditableGeoJsonLayer({
      id: PIN_LAYER_ID,
      data: {
        type: 'FeatureCollection',
        features: pinLayer.pointData ? [pinLayer.pointData] : [],
      },
      onEdit: ({ updatedData, editType }) => {
        if (editType === 'addFeature') {
          updatePointData(
            updatedData.features.length <= 1
              ? updatedData.features[0]
              : updatedData.features[1]
          );
        }
      },
      getRadius: pinLayer.radius || 1000,
      pointRadiusUnits: 'meters',
      mode: pinLayer.draw ? DrawPointMode : ViewMode,
      opacity: 1,
      _subLayerProps: {
        geojson: {
          getFillColor: [0, 0, 0, 0],
        },
      },
    });
  }
}
