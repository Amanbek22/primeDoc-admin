import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./state/root-reducer";


if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./firebase-messaging-sw.js")
        .then(function(registration) {
            console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function(err) {
            console.log("Service worker registration failed, error:", err);
        });
}
ReactDOM.render(
    // <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    // </React.StrictMode>
,
    document.getElementById('root')
);

