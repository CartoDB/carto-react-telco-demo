import { executeSQL } from '@carto/react/api';
export const getSummaryOfPoint = async ({ point, buffer, credentials, opts }) => {
  const query = `
    SELECT SUM(companya_pop) as companya, SUM(companyb_pop) as companyb  FROM bangkok_hrsl_with_company_1
    WHERE
        ST_DWITHIN(
            the_geom::geography,
            ST_GeomFromGeoJSON('${JSON.stringify(point)}')::geography,
            ${buffer})


  `;
  return await executeSQL(credentials, query, opts).then((data) => data[0]);
};
