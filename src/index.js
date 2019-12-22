/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { HashRouter } from 'react-router-dom';
import { devToolsEnhancer } from 'redux-devtools-extension';


import rootReducer from './reducers';
import App from './App';

import './index.css';
import * as serviceWorker from './serviceWorker';

const store = createStore(combineReducers(rootReducer), devToolsEnhancer());

ReactDOM.render(
  <Provider store={store}>
    <HashRouter baseName="/">
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
