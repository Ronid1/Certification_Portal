import ReactDOM  from 'react-dom';
import React from 'react';
import App from "./components/App";
import '../static/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from './services/redux/store';
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

ReactDOM.render(
    <Provider store = {store}>
        <PersistGate loading = {null} persistor = {persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('app')
);