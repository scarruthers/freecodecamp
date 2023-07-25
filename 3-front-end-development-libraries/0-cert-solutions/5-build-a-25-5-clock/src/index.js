import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import'@fortawesome/fontawesome-free/css/all.min.css';
import Clock from './Clock'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Clock />
  // </React.StrictMode>
);

