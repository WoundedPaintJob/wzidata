import * as ReactDOM from 'react-dom/client';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './root';
import Home from './home';
import Data from './data';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'data',
        element: <Data />,
      },
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
