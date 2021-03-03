import { makeStyles, Typography, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.caption,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.common.white,
    '&:empty': {
      display: 'none',
    },
  },
  info: {
    display: 'block',
    marginBottom: theme.spacing(1),
  },
}));

export function InfoPanel({ ...props }) {
  const classes = useStyles();
  const { summaryHexLayer } = useSelector((state) => state.carto.layers);
  if (!summaryHexLayer) return null;
  return (
    <Paper className={`${props.className} ${classes.root}`} elevation={2}>
      <Typography className={classes.info} variant='caption'>
        Each hexagon represents the attractiveness of an area based on certain factors .
        Change the sliders to weight certain factors more or less
      </Typography>
    </Paper>
  );
}

export default InfoPanel;
