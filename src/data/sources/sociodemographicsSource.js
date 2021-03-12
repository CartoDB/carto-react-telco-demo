const SOCIODEMOGRAPHICS_SOURCE_ID = 'sociodemographicsSource';

const source = {
  id: SOCIODEMOGRAPHICS_SOURCE_ID,
  data: `
    SELECT * FROM "developers-admin".th_grid_data_sample where the_geom && ST_MakeEnvelope(100.26277777783743, 13.480277777754887,100.96361111117133,14.2755555555333,4326)
  `,
  type: 'sql',
};

export default source;
