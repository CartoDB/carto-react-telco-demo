import GeocoderLayer from './GeocoderLayer';
import CellTowersLayer from './CellTowersLayer';
import PopulationLayer from './PopulationLayer';
import InternetSpeedsLayer from './InternetSpeedsLayer';
import SummaryHexLayer from './SummaryHexLayer';
import MarketCoverageLayer from './MarketCoverageLayer';
import PotentialRevenueLayer from './PotentialRevenueLayer';
import SociodemographicsLayer from './SociodemographicsLayer';
// Auto import

export const getLayers = () => {
  return [
    GeocoderLayer(),
    CellTowersLayer(),
    PopulationLayer(),
    InternetSpeedsLayer(),
    SummaryHexLayer(),
    MarketCoverageLayer(),
    PotentialRevenueLayer(),
    SociodemographicsLayer(),
    // Auto import layers
  ];
};
