import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import thailandAdminSource from 'data/sources/thailandAdminSource';
import { THAILAND_ADMIN_LAYER_ID } from 'components/layers/ThailandAdminLayer';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react/redux';
import { useDispatch } from 'react-redux';

function Profiling() {
  const dispatch = useDispatch();
  // Auto import useEffect

  useEffect(() => {
    dispatch(addSource(thailandAdminSource));

    dispatch(
      addLayer({
        id: THAILAND_ADMIN_LAYER_ID,
        source: thailandAdminSource.id,
      })
    );

    return function cleanup() {
      dispatch(removeLayer(THAILAND_ADMIN_LAYER_ID));
      dispatch(removeSource(thailandAdminSource.id));
    };
  }, [dispatch]);

  return <Outlet />;
}

export default Profiling;
