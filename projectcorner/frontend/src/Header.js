import React from 'react';
import './Header.css';

class Header extends React.Component{
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div id="header">
          <h1>{this.props.content}</h1>
      </div>
    )
  }

}


export default Header;
