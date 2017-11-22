import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { SensorList } from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import "../node_modules/react-vis/dist/style.css";

ReactDOM.render(<SensorList />, document.getElementById('root'));
registerServiceWorker();
