const THAILAND_ADMIN_SOURCE_ID = 'thailandAdminSource';

const source = {
  id: THAILAND_ADMIN_SOURCE_ID,
  data: `
    SELECT *, population_men + population_women as total_population FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
  `,
  type: 'sql',
};

export default source;
