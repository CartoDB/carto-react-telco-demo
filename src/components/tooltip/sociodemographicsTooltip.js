import { renderToString } from 'react-dom/server';
import { Box, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { euroTooltipFormatter, numberFormatter } from 'utils/formatter';
const useStyles = makeStyles((theme) => ({
  root: {},
  value: {
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
  subtitle: {
    textAlign: 'center',
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

const SociodemographicsTooltip = ({ feature }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.titleSection}>
        <Typography className={classes.value}>
          EUR {euroTooltipFormatter(feature.properties.avg_wvce_08_hh).value}
        </Typography>
        <Typography className={classes.subtitle} variant='subtitle2'>
          Average Spend on Communications
        </Typography>
      </Box>
      <Divider />
      <Box className={classes.breakdownSection}>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            Consumer Segment
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            {feature.properties.wvseg}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.breakdownSection}>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            Average Purchasing Power
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            EUR {numberFormatter(feature.properties.avg_di_mio)}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.breakdownSection}>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            Total Consumer Spending
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.breakdown} variant='subtitle2'>
            EUR {numberFormatter(feature.properties.wvce_08)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
const renderSociodemographicsTooltip = (feature) =>
  renderToString(<SociodemographicsTooltip feature={feature} />);

export default renderSociodemographicsTooltip;
