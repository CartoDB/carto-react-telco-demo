import GeocoderLayer from './GeocoderLayer';
import OpenCellIdLayer from './OpenCellIdLayer';
import PopulationLayer from './PopulationLayer';
import InternetSpeedsLayer from './InternetSpeedsLayer';
import SummaryHexLayer from './SummaryHexLayer';
import MarketCoverageLayer from './MarketCoverageLayer';
import PotentialRevenueLayer from './PotentialRevenueLayer';
// Auto import

export const getLayers = () => {
  return [
    GeocoderLayer(),
    OpenCellIdLayer(),
    PopulationLayer(),
    InternetSpeedsLayer(),
    SummaryHexLayer(),
    MarketCoverageLayer(),
    PotentialRevenueLayer(),
    // Auto import layers
  ];
};
