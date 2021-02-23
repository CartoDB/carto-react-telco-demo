const POPULATION_PIVOT_SOURCE_ID = 'populationPivotSource';

const source = {
  id: POPULATION_PIVOT_SOURCE_ID,
  data: `
  SELECT population_children as population , 'Children' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender 
  UNION ALL
  SELECT population_elderly as population , 'Elderly' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
  UNION ALL
  SELECT population_men as population , 'Men' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
  UNION ALL
  SELECT population_women as population , 'Women' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
  UNION ALL
  SELECT population_youth as population , 'Youth' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender 
  UNION ALL 
  SELECT companya_men+companya_women as population , 'Company A Total' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
  UNION ALL 
  SELECT companya_children as population , 'Company A Children' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender 
  UNION ALL
  SELECT companya_elderly as population , 'Company A Elderly' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
  UNION ALL
  SELECT companya_men as population , 'Company A Men' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
  UNION ALL
  SELECT companya_women as population , 'Company A Men' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
  UNION ALL
  SELECT companya_youth as population , 'Company A Youth' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender 
  UNION ALL 
  SELECT companyb_men+companyb_women as population , 'Company B Total' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
  UNION ALL 
  SELECT companyb_children as population , 'Company B Children' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender 
  UNION ALL
  SELECT companyb_elderly as population , 'Company B Elderly' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
  UNION ALL
  SELECT companyb_men as population , 'Company B Men' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
  UNION ALL
  SELECT companyb_women as population , 'Company B Men' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender
  UNION ALL
  SELECT companyb_youth as population , 'Company B Youth' as category FROM derived_bangkok_adm2_pop_per_company_per_age_and_gender 
  `,
  type: 'sql',
};

export default source;
