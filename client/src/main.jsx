import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './routes/Router.jsx'
import { Provider } from 'react-redux'; 
import store from './store/store.js';
import { injectstoreInAxios } from './api/axiosInstance.js';
import swRegister from './swRegister.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <Router />
    </Provider>
)

injectstoreInAxios(store);

// 서비스 워커 등록 
swRegister();
