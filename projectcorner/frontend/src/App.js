import React from 'react';
import ReactDOM from 'react-dom';
import Contents from './Contents';
import Header from './Header';
import Navigationbar from './Navigationbar';
import Footer from './Footer';
import Loginform from './Loginform'

class App extends React.Component{
  constructor(props) {
    super(props)
  }



  render(){

    return(

      <Loginform />

    )



  }

}


export default App;
