import React from 'react'
import './Footer.css'

class Footer extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      content:"copyright@studentsportal",
      email:"studentsportalvnit@gmail.com",
    }

  }

  render(){

    return(
      <div id="footer">
        <h4>{this.state.content}</h4>
        <h5>Contact</h5>
        <p>email:{this.state.email}</p>
      </div>
    )

  }

}


export default Footer
