import React from 'react'
import './Navigationbar.css'
import { Switch, Route, Link} from "react-router-dom";
import Routes from './Routes'

class Navbrand extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      brandname:"STUPO",
    }
  }

  render()
  {
    return(
        <a class="navbar-brand" href="#">{this.state.brandname}</a>
    )
  }
}

class CollapseButton extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      toggler:"navbar-toggler-icon",
    }
  }

  render(){

    return(
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class={this.state.toggler}></span>
      </button>
    )

  }
}

class Navlinks extends React.Component{
  constructor(props){
    super(props)
  }

  render(){

      const usersessions =()=>{

              if(localStorage.getItem('token'))
              {
                return(
                  <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                    <ul class="navbar-nav">
                      <li class="nav-item">
                        <Link class="btn btn-dark">{localStorage.getItem('username')}</Link>
                        <Link to={"/Logout/"}class="btn btn-primary">Logout</Link>
                      </li>
                    </ul>
                  </div>
                )
              }
              else {
                return
              }

      }


      return(
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
              <li class="nav-item"><Link to={"/ContentsApplicants/"} class="nav-link">Home</Link></li>
              <li class="nav-item"><Link to={"/Contents/"} class="nav-link">Contents</Link></li>
              <li class="nav-item"><Link to={"/"} class="nav-link">Login</Link></li>
              <li class="nav-item"><Link to={"/ContentsProfessor/:professor_id"} class="nav-link">About</Link></li>
              <li class="nav-item"><Link to={"/Applicationform/"} class="nav-link">Apply</Link></li>
              <li class="nav-item"><Link to={"/Addprojectform/"} class="nav-link">Add</Link></li>
            </ul>

            {usersessions()}

        </div>

      )
  }


}

class Navigationbar extends React.Component {

  render(){
    return(
        <nav class="navbar navbar-expand-md ">
          <Navbrand />
          <CollapseButton />
          <Navlinks/>

        </nav>
    )
  }
}

export default Navigationbar
