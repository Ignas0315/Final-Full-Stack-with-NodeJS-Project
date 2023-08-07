import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './state/store.js';
// import globalSlice from 'state';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
    reducer: {
        global: globalSlice,
    },
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
