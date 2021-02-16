import { executeSQL } from '@carto/react/api';
export const getAdmin = async ({ id, credentials, opts }) => {
  const query = `
    SELECT *
      FROM thailand_admin
      WHERE adm2_pcode='${id}'
  `;
  return await executeSQL(credentials, query, opts).then((data) => data[0]);
};
