const OPEN_CELL_ID_SOURCE_ID = 'openCellIdSource';

const source = {
  id: OPEN_CELL_ID_SOURCE_ID,
  data: `
  SELECT * from "developers-admin".bangkok_opencellid_2019
  `,
  type: 'sql',
};

export default source;
