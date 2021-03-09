import { Paper, makeStyles } from '@material-ui/core';
import PopulationLegend from './PopulationLegend';
import OpenCellIdLegend from './OpenCellIdLegend';
import InternetSpeedLegend from './InternetSpeedLegend';
import MarketCoverageLegend from './MarketCoverageLegend';
import PotentialRevenueLegend from './PotentialRevenueLegend';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.caption,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.common.white,
  },
}));

function Legend({ className }) {
  const classes = useStyles();

  return (
    <Paper elevation={4} className={`${classes.root} ${className} `}>
      <PopulationLegend />
      <OpenCellIdLegend />
      <InternetSpeedLegend />
      <MarketCoverageLegend />
      <PotentialRevenueLegend />
    </Paper>
  );
}

export default Legend;
