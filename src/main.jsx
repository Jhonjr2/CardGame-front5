import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import "bootswatch/dist/lux/bootstrap.min.css";
import './config/i18nextConfig'
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
        <App />
    </HashRouter>
  </React.StrictMode>,
)