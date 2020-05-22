//  Module imports--------------
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css' ;
import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.js';
// Module imports end-----------

//Local imports-----------------
import './css/index.css';
import Contents from './components/Contents';
import Header from './components/Header';
import Navigationbar from './components/Navigationbar';
import Footer from './components/Footer';
import App from './components/App';
import Loginform from './components/Loginform'
import * as serviceWorker from './serviceWorker';
import Routes from './components/Routes'
//Local imports end--------------


ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes />
    <Footer />
  </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
