import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Contents from './Contents';
import Header from './Header';
import Navigationbar from './Navigationbar';
import Footer from './Footer';
import App from './App';
import Loginform from './Loginform'
import * as serviceWorker from './serviceWorker';
import Routes from './Routes'
import {BrowserRouter} from 'react-router-dom'


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
