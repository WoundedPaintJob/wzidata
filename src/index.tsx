import * as ReactDOM from 'react-dom/client';
import React from 'react';
import Home from './home';
const element = document.getElementById('app');
if (element)
  ReactDOM.createRoot(element).render(
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  );
