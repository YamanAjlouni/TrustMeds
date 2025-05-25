import React from 'react';
import './index.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import store from './redux/store';
import setupAuthInterceptors from './middleware/authMiddleware';
import axiosInstance from './redux/axiosInstance';

// Setup auth interceptors for axios
setupAuthInterceptors(axiosInstance);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);