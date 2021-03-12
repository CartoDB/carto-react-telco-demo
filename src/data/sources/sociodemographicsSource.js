const SOCIODEMOGRAPHICS_SOURCE_ID = 'sociodemographicsSource';

const source = {
  id: SOCIODEMOGRAPHICS_SOURCE_ID,
  data: `
    SELECT * FROM "developers-admin".th_grid_data_sample where the_geom && ST_MakeEnvelope( 100.26397705075829,13.477776891592331, 100.95611572264768,14.277692195916213,4326)
  `,
  type: 'sql',
};

export default source;
