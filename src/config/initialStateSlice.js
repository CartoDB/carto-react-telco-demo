import { GOOGLE_ROADMAP } from '@carto/react/basemaps';

export const initialState = {
  viewState: {
    latitude: 13.012379386614766,
    longitude: 104.10658904368671,
    zoom: 5,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
  },
  basemap: GOOGLE_ROADMAP,
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
