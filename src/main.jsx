import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import './index.css';
import { ProveedorApp } from './context/AppContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProveedorApp>
    <App />
  </ProveedorApp>
);
