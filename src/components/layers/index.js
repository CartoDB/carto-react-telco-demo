import GeocoderLayer from './GeocoderLayer';
import OpenCellIdLayer from './OpenCellIdLayer';
import PopulationLayer from './PopulationLayer';
import InternetSpeedsLayer from './InternetSpeedsLayer';
import ThailandAdminLayer from './ThailandAdminLayer';
import PinLayer from './PinLayer';
// Auto import

export const getLayers = () => {
  return [
    GeocoderLayer(),
    ThailandAdminLayer(),
    PinLayer(),
    OpenCellIdLayer(),
    PopulationLayer(),
    InternetSpeedsLayer(),
    // Auto import layers
  ];
};
