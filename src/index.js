import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Store
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import "../node_modules/react-vis/dist/style.css";

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>), 
  document.getElementById('root'));

registerServiceWorker();
