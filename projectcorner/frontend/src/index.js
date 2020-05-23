import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Contents from './components/Contents';
import Header from './components/Header';
import Navigationbar from './components/Navigationbar';
import Footer from './components/Footer';
import App from './components/App';
import Loginform from './components/Loginform'
import * as serviceWorker from './serviceWorker';
import Routes from './components/Routes'
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
