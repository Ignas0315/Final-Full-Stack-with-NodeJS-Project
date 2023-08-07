import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './state/store.js';
// import globalSlice from 'state';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import lt from 'date-fns/locale/de';

const store = configureStore({
    reducer: {
        global: globalSlice,
    },
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={lt}>
            <Provider store={store}>
                <App />
            </Provider>
        </LocalizationProvider>
    </React.StrictMode>
);
