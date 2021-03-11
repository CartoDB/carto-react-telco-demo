import { useSelector } from 'react-redux';
import { Paper, makeStyles } from '@material-ui/core';
import PopulationLegend from './PopulationLegend';
import OpenCellIdLegend from './OpenCellIdLegend';
import InternetSpeedLegend from './InternetSpeedLegend';
import MarketCoverageLegend from './MarketCoverageLegend';
import PotentialRevenueLegend from './PotentialRevenueLegend';
import SociodemographicsLegend from './SociodemographicsLegend';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.caption,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.common.white,
    maxHeight: '50%',
    width: '150px',
    overflow: 'scroll',
  },
}));

function Legend({ className }) {
  const classes = useStyles();
  const {
    populationLayer,
    internetSpeedsLayer,
    openCellIdLayer,
    potentialRevenueLayer,
    marketCoverageLayer,
    sociodemographicsLayer,
  } = useSelector((state) => state.carto.layers);
  if (
    !(
      populationLayer ||
      internetSpeedsLayer ||
      openCellIdLayer ||
      potentialRevenueLayer ||
      marketCoverageLayer ||
      sociodemographicsLayer
    )
  ) {
    return null;
  }
  return (
    <Paper elevation={4} className={`${classes.root} ${className} `}>
      <PopulationLegend />
      <OpenCellIdLegend />
      <InternetSpeedLegend />
      <MarketCoverageLegend />
      <PotentialRevenueLegend />
      <SociodemographicsLegend />
    </Paper>
  );
}

export default Legend;
