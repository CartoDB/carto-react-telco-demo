import GeocoderLayer from './GeocoderLayer';
import OpenCellIdLayer from './OpenCellIdLayer';
import PopulationLayer from './PopulationLayer';
import InternetSpeedsLayer from './InternetSpeedsLayer';
import ThailandAdminLayer from './ThailandAdminLayer';
// Auto import

export const getLayers = () => {
  return [
    GeocoderLayer(),
    OpenCellIdLayer(),
    PopulationLayer(),
    InternetSpeedsLayer(),
    ThailandAdminLayer(),
    // Auto import layers
  ];
};
