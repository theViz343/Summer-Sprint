import React from 'react';
import {Link} from 'react-router-dom';
import Navigationbar from './Navigationbar';
import Header from './Header';
import '../css/Dashboard.css'

class DashboardProfessor extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {

    };
  }

  render()
  {
    return(
      <div>
      <Navigationbar />
        <div class="container">
        <Header content="Welcome" />
          <div class="row">
            <div class="col-sm-6">
              <div class="card dashboard-card">
                <div class="card-body">
                  <h4 class="card-title">My Projects</h4>
                  <p class="card-text">Track all your posted projects</p>
                  <Link to={"/ContentsProfessor/"} class="btn btn-info dashboard-button">
                    <i class="fa fa-list-ul fa-dashboard-custom"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card dashboard-card">
                <div class="card-body">
                  <h4 class="card-title">Add Project</h4>
                    <p class="card-text">Add a new project</p>
                 <Link to={"/Addprojectform/"} class="btn btn-info dashboard-button">
                    <i class="fa fa-plus fa-dashboard-custom"></i>
                 </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )

  }

}


export default DashboardProfessor;
