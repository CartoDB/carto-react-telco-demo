import { executeSQL } from '@carto/react/api';
export const getAdmin = async ({ id, credentials, opts }) => {
  const query = `
    SELECT *
      FROM thailand_adm3_hrsl_ookla_speedtest_q1toq4_mobile
      WHERE adm3_pcode_key='${id}'
  `;
  return await executeSQL(credentials, query, opts).then((data) => data[0]);
};
