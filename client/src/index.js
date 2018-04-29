import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Inputs from './Inputs';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Inputs />, document.getElementById('inputs'));
registerServiceWorker();
