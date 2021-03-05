import { renderToString } from 'react-dom/server';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { populationTooltipFormatter } from 'utils/formatter';
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
  return (
    <Box className={classes.root}>
      <Box className={classes.titleSection}>
        <Typography className={classes.populationValue}>
          {populationTooltipFormatter(feature.properties.potential_revenue)}
        </Typography>
        <Typography variant='subtitle2'>Potential Revenue (‘000 Baht)</Typography>
      </Box>
    </Box>
  );
};
const renderPotentialRevenueTooltip = (feature) =>
  renderToString(<PotentialRevenueTooltip feature={feature} />);

export default renderPotentialRevenueTooltip;
