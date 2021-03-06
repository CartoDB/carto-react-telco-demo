import { useSelector } from 'react-redux';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { COLORS, LABELS } from 'components/layers/MarketCoverageLayer';
import { rgbToHex } from 'utils/colors';
const useStyles = makeStyles((theme) => ({
  title: {
    display: 'block',
    margin: theme.spacing(0.25, 0),
  },

  element: {
    ...theme.typography.overline,
    textTransform: 'none',
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.25, 0),
  },

  dot: {
    flex: '0 0 auto',
    width: 8,
    height: 8,
    marginRight: theme.spacing(1),
    border: '1px gray solid',
  },
}));
function MarketCoverageLegend() {
  const classes = useStyles();
  const { marketCoverageLayer } = useSelector((state) => state.carto.layers);

  if (!marketCoverageLayer) return null;

  return (
    <>
      <Typography className={classes.title} variant='caption'>
        Market Coverage
      </Typography>

      {COLORS.map((elem, i) => (
        <Grid
          container
          direction='row'
          alignItems='center'
          className={classes.element}
          key={i}
        >
          <div
            className={classes.dot}
            style={{
              backgroundColor: rgbToHex(elem),
            }}
          />
          {LABELS[i]}
        </Grid>
      ))}
    </>
  );
}

export default MarketCoverageLegend;
