import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './state/store.js';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import au from 'date-fns/locale/en-AU';
import { AuthContextProvider } from './contexts/AuthContext.jsx';

const store = configureStore({
    reducer: {
        global: globalSlice,
    },
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={au}>
            <Provider store={store}>
                <App />
            </Provider>
        </LocalizationProvider>
    </AuthContextProvider>
);
