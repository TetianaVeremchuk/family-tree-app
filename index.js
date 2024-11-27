import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './styles/global.scss';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Provider, { store: store },
    React.createElement(React.StrictMode, null,
        React.createElement(App, null))));
