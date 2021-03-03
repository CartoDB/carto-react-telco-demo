import { renderToString } from 'react-dom/server';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {},
  value: {
    fontWeight: 'bold',
    fontSize: '24px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marketShareWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marketShareContainer: {
    flexDirection: 'column',
    display: 'flex',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marketShareValue: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
}));

const PopulationTooltip = ({ feature }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.section}>
        <Typography className={classes.value}>
          {feature.properties.total_population.toFixed(0)}
        </Typography>
        <Typography variant='subtitle2'>Total Population</Typography>
      </Box>
      <Box className={classes.marketShareWrapper}>
        <Box className={classes.marketShareContainer}>
          <Typography className={classes.marketShareValue}>
            {feature.properties.companyA_population.toFixed(0)}
          </Typography>
          <Typography variant='subtitle2'>Company A</Typography>
        </Box>
        <Box className={classes.marketShareContainer}>
          <Typography className={classes.marketShareValue}>
            {feature.properties.companyB_population.toFixed(0)}
          </Typography>
          <Typography variant='subtitle2'>Company B</Typography>
        </Box>
      </Box>
    </Box>
  );
};
const renderPopulationTooltip = (feature) =>
  renderToString(<PopulationTooltip feature={feature} />);

export default renderPopulationTooltip;
