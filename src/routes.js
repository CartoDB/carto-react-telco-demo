import React from 'react';
import { Navigate } from 'react-router-dom';
import { OAuthCallback } from '@carto/react-auth';
import Main from 'components/views/Main';
import NotFound from 'components/views/NotFound';

import Capex from 'components/views/Capex.js';
import Profiling from 'components/views/Profiling.js';

// Auto import
const routes = [
  {
    path: '/',
    element: <Main />,
    children: [
      { path: '/', element: <Navigate to='/profiling' /> },
      {
        path: '/profiling',
        element: <Profiling />,
      },
      { path: '/capex', element: <Capex /> },

      // Auto import routes
    ],
  },
  { path: '/oauthCallback', element: <OAuthCallback /> },
  { path: '404', element: <NotFound /> },
  { path: '*', element: <Navigate to='/404' /> },
];

export default routes;
