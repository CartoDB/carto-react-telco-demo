import { VOYAGER } from '@carto/react-basemaps';

export const initialState = {
  viewState: {
    latitude: 13.921457408056295,
    longitude: 100.78633522577707,
    zoom: 9,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
  },
  basemap: VOYAGER, // Gmaps is buggy and i dont like it
  credentials: {
    username: 'public',
    apiKey: 'default_public',
    serverUrlTemplate: 'https://{user}.carto.com',
  },
  googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY, // only required when using a Google Basemap
};

export const oauthInitialState = {
  oauthApp: {
    clientId: 'wn9xASUYFYlg',
    scopes: [
      'user:profile', // to load avatar photo
      'dataservices:geocoding', // to use geocoding through Data Services API
      'dataservices:isolines', // to launch isochrones or isodistances through Data Services API
      'datasets:r:developers-admin.bangkok_opencellid_2019',
      'datasets:r:developers-admin.th_grid_data_sample',
    ],
    authorizeEndPoint: 'https://carto.com/oauth2/authorize', // only valid if keeping https://localhost:3000/oauthCallback
  },
  token: null,
  userInfo: null,
};
