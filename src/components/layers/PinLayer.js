import { useState } from 'react';
import { useSelector } from 'react-redux';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import { DrawPointMode } from '@nebula.gl/edit-modes';
export const PIN_LAYER_ID = 'pinLayer';
export default function PinLayer() {
  const { pinLayer } = useSelector((state) => state.carto.layers);
  const [data, setData] = useState({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [100.50155639648438, 13.64198320382471],
        },
      },
    ],
  });
  if (pinLayer) {
    return new EditableGeoJsonLayer({
      id: PIN_LAYER_ID,
      data: data,
      onEdit: ({ updatedData, featureIndexes }) => {
        console.dir(updatedData.features);
        setData({
          type: 'FeatureCollection',
          features:
            updatedData.features.length <= 1
              ? updatedData.features
              : updatedData.features.slice(1),
        });
      },
      getRadius: pinLayer.radius || 1000,
      pointRadiusUnits: 'meters',
      mode: DrawPointMode,
      opacity: 1,
      _subLayerProps: {
        geojson: {
          getFillColor: [0, 0, 0, 0],
        },
      },
    });
  }
}
