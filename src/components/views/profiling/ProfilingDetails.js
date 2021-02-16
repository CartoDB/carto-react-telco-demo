import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useParams } from 'react-router-dom';
import { Divider, Grid, Typography, CircularProgress } from '@material-ui/core';

import { selectSourceById, updateLayer } from '@carto/react/redux';

import {
  FormulaWidgetUI,
  WrapperWidgetUI,
  HistogramWidgetUI,
  CategoryWidgetUI,
} from '@carto/react/ui';

import { useDispatch, useSelector } from 'react-redux';
import { setError } from 'config/appSlice';
import {
  numberFormatter,
  internetSpeedFormatter,
  percentageFormatter,
} from 'utils/formatter';

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
        dispatch(setError(`getAdmin error: ${error.message}`));
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
            Geographic Profiling: {adminDetail.adm2_th} ({adminDetail.adm2_en})
          </Typography>
          <Divider />
          <WrapperWidgetUI title='Total Population'>
            <FormulaWidgetUI data={adminDetail.population} formatter={numberFormatter} />
          </WrapperWidgetUI>
          <WrapperWidgetUI title='Current Market Coverage'>
            <FormulaWidgetUI data={10.1} formatter={percentageFormatter} />
          </WrapperWidgetUI>
          <WrapperWidgetUI title='Competitor Market Coverage'>
            <FormulaWidgetUI data={89.9} formatter={percentageFormatter} />
          </WrapperWidgetUI>
          <WrapperWidgetUI title='Average Downloads Speed'>
            <FormulaWidgetUI
              data={adminDetail.average_speed}
              formatter={internetSpeedFormatter}
            />
          </WrapperWidgetUI>
          <WrapperWidgetUI title='Downloads Speed for Fixed'>
            <HistogramWidgetUI
              data={[100, 50, 25, 12, 6, 3, 1]}
              dataAxis={[
                '10mbps',
                '20mbps',
                '30mbps',
                '40mbps',
                '50mbps',
                '60mbps',
                '70mbps',
              ]}
              yAxisFormatter={JSON.stringify}
              tooltipFormatter={([series]) => `Total: ${series.value}`}
            />
          </WrapperWidgetUI>
          <WrapperWidgetUI title='Population Breakdown'>
            <CategoryWidgetUI
              data={[
                { category: '10', value: 100 },
                { category: '20', value: 50 },
                { category: '30', value: 25 },
                { category: '40', value: 12 },
                { category: '50', value: 6 },
                { category: '60', value: 3 },
                { category: '70', value: 1 },
              ]}
              labels={{
                10: '10mbps',
                20: '20mbps',
                30: '30mbps',
                40: '40mbps',
                50: '50mbps',
                60: '60mbps',
                70: '70mbps',
              }}
              formatter={JSON.stringify}
              tooltipFormatter={([series]) => `Total: ${series.value}`}
            />
          </WrapperWidgetUI>
        </Grid>
      )}
    </>
  );
}
