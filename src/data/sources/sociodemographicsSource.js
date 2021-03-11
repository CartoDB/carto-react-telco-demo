const SOCIODEMOGRAPHICS_SOURCE_ID = 'sociodemographicsSource';

const source = {
  id: SOCIODEMOGRAPHICS_SOURCE_ID,
  data: `
    SELECT * FROM "developers-admin".th_grid_data_sample
  `,
  type: 'sql',
};

export default source;
