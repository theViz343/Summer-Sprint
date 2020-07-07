import React from 'react';
import ReactDOM from 'react-dom';
import Loginform from './Loginform'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
