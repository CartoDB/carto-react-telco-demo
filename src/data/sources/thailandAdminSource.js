const THAILAND_ADMIN_SOURCE_ID = 'thailandAdminSource';

const source = {
  id: THAILAND_ADMIN_SOURCE_ID,
  data: `
    SELECT * FROM thailand_admin
  `,
  type: 'sql',
};

export default source;
