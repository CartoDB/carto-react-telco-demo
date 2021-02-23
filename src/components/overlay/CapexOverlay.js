import React from 'react';
import { useSelector } from 'react-redux';
import { Box, makeStyles, Typography, Divider, Paper } from '@material-ui/core';
import { HtmlOverlay, HtmlOverlayItem } from '@nebula.gl/overlays';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  divider: {
    height: '2px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(1, 0, 1.5),
  },
}));
export const CapexOverlayItem = ({ className }) => {
  const classes = useStyles();
  const { pinLayer } = useSelector((state) => state.carto.layers);
  return (
    <Box className={classes.root}>
      <Box className={classes.section}>
        <Typography variant='h5'>USD 486k</Typography>
        <Typography variant='subtitle1'>Untapped Market Potential</Typography>
      </Box>
      <Divider flexItem className={classes.divider} />
      <Box className={classes.section}>
        <Typography variant='h6'>
          {(
            (pinLayer.summaryData.companyb /
              (pinLayer.summaryData.companya + pinLayer.summaryData.companyb)) *
            100
          ).toFixed(2)}{' '}
          %
        </Typography>
        <Typography variant='subtitle1'>Competition Market Coverage</Typography>
      </Box>
      <Divider flexItem className={classes.divider} />
      <Box className={classes.section}>
        <Typography variant='h6'>Age Distribution</Typography>
        <Box width='100%' display='flex' flexDirection='row' marginTop='5px'>
          <Box width='10%' height='10px' style={{ backgroundColor: '#2292EC' }} />
          <Box width='70%' height='10px' style={{ backgroundColor: '#EF4631' }} />
          <Box width='20%' height='10px' style={{ backgroundColor: '#F7BB09' }} />
        </Box>
        <Box
          width='100%'
          display='flex'
          flexDirection='row'
          marginTop='5px'
          justifyContent='space-between'
        >
          <Box
            width='10px'
            height='10px'
            borderRadius='10px'
            style={{ backgroundColor: '#2292EC' }}
            marginY='auto'
          />
          <Typography variant='caption'>Youth</Typography>
          <Box
            width='10px'
            height='10px'
            borderRadius='10px'
            style={{ backgroundColor: '#EF4631' }}
            marginY='auto'
          />
          <Typography variant='caption'>Adults</Typography>
          <Box
            width='10px'
            height='10px'
            borderRadius='10px'
            style={{ backgroundColor: '#F7BB09' }}
            marginY='auto'
          />
          <Typography variant='caption'>Elderly</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  pinLayer: state.carto.layers.pinLayer,
});

class CapexOverlay extends HtmlOverlay {
  getItems() {
    const { pinLayer } = this.props;
    if (pinLayer?.summaryData && pinLayer?.pointData) {
      return [
        <HtmlOverlayItem
          coordinates={pinLayer.pointData.geometry.coordinates}
          style={{ zIndex: 1000 }}
        >
          <div className={this.props.className}>
            <Paper className='content' elevation={2}>
              <CapexOverlayItem />
              <div className='arrow'></div>
            </Paper>
          </div>
        </HtmlOverlayItem>,
      ];
    } else {
      return [];
    }
  }
}
const CapexOverlayState = connect(mapStateToProps)(CapexOverlay);
export default CapexOverlayState;
