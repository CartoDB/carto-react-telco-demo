import GeocoderLayer from './GeocoderLayer';
import OpenCellIdLayer from './OpenCellIdLayer';
import PopulationLayer from './PopulationLayer';
import InternetSpeedsLayer from './InternetSpeedsLayer';
import SummaryHexLayer from './SummaryHexLayer';
// Auto import

export const getLayers = () => {
  return [
    GeocoderLayer(),
    OpenCellIdLayer(),
    PopulationLayer(),
    InternetSpeedsLayer(),
    SummaryHexLayer(),
    // Auto import layers
  ];
};
