const THAILAND_ADMIN_SOURCE_ID = 'thailandAdminSource';

const source = {
  id: THAILAND_ADMIN_SOURCE_ID,
  data: `
    SELECT * FROM thailand_adm3_hrsl_ookla_speedtest_q1toq4_mobile
  `,
  type: 'sql',
};

export default source;
