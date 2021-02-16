import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useParams } from 'react-router-dom';
import { Divider, Grid, Typography, CircularProgress } from '@material-ui/core';

import { selectSourceById, updateLayer } from '@carto/react/redux';

import { FormulaWidgetUI, WrapperWidgetUI } from '@carto/react/ui';

import { useDispatch, useSelector } from 'react-redux';
import { setError } from 'config/appSlice';
import { numberFormatter } from 'utils/formatter';

import thailandAdminSource from 'data/sources/thailandAdminSource';
import { THAILAND_ADMIN_LAYER_ID } from 'components/layers/ThailandAdminLayer';

import { getAdmin } from 'data/models/thailandAdminModel';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    padding: theme.spacing(3, 3, 1.5),
  },
}));

export default function Profiling() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const source = useSelector((state) => selectSourceById(state, thailandAdminSource.id));
  const [adminDetail, setAdminDetail] = useState(null);
  // Auto import useEffec
  useEffect(() => {
    if (!source) return;
    const { credentials } = source;
    const abortController = new AbortController();
    dispatch(
      updateLayer({
        id: THAILAND_ADMIN_LAYER_ID,
        layerAttributes: { selectedAdmin: id },
      })
    );
    getAdmin({ id, credentials, opts: { abortController } })
      .then((admin) => {
        setAdminDetail(admin);
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        dispatch(setError(`getRevenuePerMonth error: ${error.message}`));
      });
    return () => {
      dispatch(
        updateLayer({
          id: THAILAND_ADMIN_LAYER_ID,
          layerAttributes: { selectedAdmin: null },
        })
      );
      abortController.abort();
    };
  }, [dispatch, source, id, location.state]);
  return (
    <>
      {adminDetail == null ? (
        <Grid container item justify='center' alignItems='center' style={{ flexGrow: 1 }}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container direction='column' className={classes.root}>
          <Typography variant='h5' gutterBottom className={classes.title}>
            Geographic Profiling: {adminDetail.adm3_th} ({adminDetail.adm3_en})
          </Typography>
          <Divider />
          <WrapperWidgetUI title='Total Population'>
            <FormulaWidgetUI
              title='Total Population'
              data={adminDetail.population}
              formatter={numberFormatter}
            />
          </WrapperWidgetUI>
        </Grid>
      )}
    </>
  );
}
