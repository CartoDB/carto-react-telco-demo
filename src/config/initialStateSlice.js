import { VOYAGER } from '@carto/react/basemaps';

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
    username: process.env.REACT_APP_CARTO_USERNAME,
    apiKey: process.env.REACT_APP_CARTO_API_KEY,
    serverUrlTemplate: 'https://{user}.carto.com',
  },
  googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY, // only required when using a Google Basemap
};

export const oauthInitialState = {
  oauthApp: {
    clientId: process.env.REACT_APP_CARTO_CLIENT_ID,
    scopes: [
      'user:profile', // to load avatar photo
      'dataservices:geocoding', // to use geocoding through Data Services API
      'dataservices:isolines', // to launch isochrones or isodistances through Data Services API
    ],
    authorizeEndPoint: 'https://carto.com/oauth2/authorize', // only valid if keeping https://localhost:3000/oauthCallback
  },
  token: null,
  userInfo: null,
};
