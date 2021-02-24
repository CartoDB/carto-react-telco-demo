import { executeSQL } from '@carto/react/api';
export const getAdmin = async ({ id, credentials, opts }) => {
  const query = `
    SELECT *, population_men + population_women as total_population
      FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
      WHERE adm2_pcode='${id}'
  `;
  return await executeSQL(credentials, query, opts).then((data) => data[0]);
};
