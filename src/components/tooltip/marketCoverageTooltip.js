import { renderToString } from 'react-dom/server';
import { Box, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { percentageFormatter } from 'utils/formatter';
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
    padding: 5,
  },
  breakdown: {
    padding: '0 10px',
  },
}));

const MarketCoverageTooltip = ({ feature }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.titleSection}>
        <Typography className={classes.populationValue}>
          {percentageFormatter(feature.properties.market_share * 100).value} %
        </Typography>
        <Typography variant='subtitle2'>Market Coverage</Typography>
      </Box>
      <Divider />
      <Box className={classes.breakdownSection}>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            Competitor Mkt Coverage
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            {percentageFormatter(feature.properties.competitor_market_share * 100).value}{' '}
            %
          </Typography>
        </Box>
      </Box>
      <Box className={classes.breakdownSection}>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            Not Covered by towers
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            {percentageFormatter(feature.properties.total_pop * 100).value} %
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
const renderMarketCoverageTooltip = (feature) =>
  renderToString(<MarketCoverageTooltip feature={feature} />);

export default renderMarketCoverageTooltip;
