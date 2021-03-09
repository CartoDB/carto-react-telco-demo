import { renderToString } from 'react-dom/server';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { bahtTooltipFormatter } from 'utils/formatter';
const useStyles = makeStyles((theme) => ({
  root: {},
  populationValue: {
    fontWeight: 'bold',
    fontSize: '24px',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
}));

const PotentialRevenueTooltip = ({ feature }) => {
  const classes = useStyles();
  const formatted = bahtTooltipFormatter(feature.properties.potential_revenue);
  return (
    <Box className={classes.root}>
      <Box className={classes.titleSection}>
        <Typography className={classes.populationValue}>
          {formatted.prefix} {formatted.value}
        </Typography>
        <Typography variant='subtitle2'>Potential Revenue</Typography>
      </Box>
    </Box>
  );
};
const renderPotentialRevenueTooltip = (feature) =>
  renderToString(<PotentialRevenueTooltip feature={feature} />);

export default renderPotentialRevenueTooltip;
