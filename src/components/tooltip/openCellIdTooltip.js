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
  companySection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    padding: 2,
  },
  company: {
    fontWeight: 'bold',
  },
}));

const OpenCellIdTooltip = ({ feature }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.section}>
        <Typography className={classes.value}>{feature.properties.radio}</Typography>
        <Typography variant='subtitle2'>Technology</Typography>
      </Box>
      <Box className={classes.companySection}>
        <Typography variant='subtitle2' className={classes.title}>
          Network Operator
        </Typography>
        <Typography
          variant='subtitle2'
          className={classes.company}
          style={{
            color:
              feature.properties.network_operator === 'Company A'
                ? 'rgb(207, 89, 126)'
                : 'rgb(156, 203, 134)',
          }}
        >
          {feature.properties.network_operator}
        </Typography>
      </Box>
    </Box>
  );
};
const renderOpenCellIdTooltip = (feature) =>
  renderToString(<OpenCellIdTooltip feature={feature} />);
export default renderOpenCellIdTooltip;
