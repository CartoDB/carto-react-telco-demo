import { renderToString } from 'react-dom/server';
import { Box, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { PICTON_BLUE, YELLOW_ORANGE } from 'utils/colors';

const useStyles = makeStyles((theme) => ({
  root: {},
  radioValue: {
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
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  column: {
    padding: '0 10px',
  },
  company: {
    padding: '0 10px',
  },
  companyA: {
    color: PICTON_BLUE.hex,
  },
  companyB: {
    color: YELLOW_ORANGE.hex,
  },
}));

const OpenCellIdTooltip = ({ feature }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.titleSection}>
        <Typography className={classes.radioValue}>{feature.properties.radio}</Typography>
        <Typography variant='subtitle2'>Technology</Typography>
      </Box>
      <Divider />
      <Box className={classes.section}>
        <Box>
          <Typography variant='subtitle2' className={classes.column}>
            Network Operator
          </Typography>
        </Box>
        <Box>
          <Typography
            variant='subtitle2'
            className={`${classes.company} ${
              feature.properties.network_operator === 'Company A'
                ? classes.companyA
                : classes.companyB
            }`}
          >
            {feature.properties.network_operator}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
const renderOpenCellIdTooltip = (feature) =>
  renderToString(<OpenCellIdTooltip feature={feature} />);
export default renderOpenCellIdTooltip;
