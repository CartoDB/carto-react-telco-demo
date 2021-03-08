import { renderToString } from 'react-dom/server';
import { Box, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { percentageFormatter, populationTooltipFormatter } from 'utils/formatter';
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
  breakdownSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px 0 0',
  },
  breakdown: {
    padding: '0 10px',
  },
}));

const PopulationTooltip = ({ feature }) => {
  const classes = useStyles();
  const percentCovered =
    feature.properties.companyA_population / feature.properties.total_population;
  const percentFemale =
    feature.properties.total_women / feature.properties.total_population;
  const percentAdult =
    1 -
    (feature.properties.total_elderly +
      feature.properties.total_children +
      feature.properties.total_youth) /
      feature.properties.total_population;
  return (
    <Box className={classes.root}>
      <Box className={classes.titleSection}>
        <Typography className={classes.populationValue}>
          {populationTooltipFormatter(feature.properties.total_population)}
        </Typography>
        <Typography variant='subtitle2'>Total Population</Typography>
      </Box>
      <Divider />
      <Box className={classes.breakdownSection}>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            % Covered
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            {percentageFormatter(percentCovered).value} %
          </Typography>
        </Box>
      </Box>
      <Box className={classes.breakdownSection}>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            % Female
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            {percentageFormatter(percentFemale).value} %
          </Typography>
        </Box>
      </Box>
      <Box className={classes.breakdownSection}>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            % Adult
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            {percentageFormatter(percentAdult).value} %
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
const renderPopulationTooltip = (feature) =>
  renderToString(<PopulationTooltip feature={feature} />);

export default renderPopulationTooltip;
