const SOCIODEMOGRAPHICS_SOURCE_ID = 'sociodemographicsSource';

const source = {
  id: SOCIODEMOGRAPHICS_SOURCE_ID,
  data: `
  SELECT * ,
  CASE wvseg
when 'A' THEN 'High Earning Urban Professionals'
WHEN 'B' THEN 'Comfortably Off Empty Nesters'
WHEN 'C' Then 'Modern and Pragmatic Over-50s'
WHEN 'D' THEN 'Well Informed Modern Consumers'
WHEN 'E' THEN 'Affluent Highly Educated Urban Families'
WHEN 'F' THEN 'Security-oriented Seniors'
WHEN 'G' THEN 'Orientation Seeking Lower and Middle Class Consumers'
WHEN 'H' THEN 'Younger Lower and Middle Class Consumers'
WHEN 'I' THEN 'Modern Younger Families'
WHEN 'J' THEN 'Low-Income Younger Consumers'
else 'Others' 
end as wvseg2,
 wvce_08 / NULLIF(pop, 0) as ave_wvce_08, di_mio * 1000000/ NULLIF(pop, 0)  as ave_di_mio FROM "developers-admin".th_grid_data_sample where the_geom && ST_MakeEnvelope(100.26277777783743, 13.480277777754887,100.96361111117133,14.2755555555333,4326)
  `,
  type: 'sql',
};

export default source;
