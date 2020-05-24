import React from 'react';
import {Link} from 'react-router-dom';
import Navigationbar from './Navigationbar';
import Header from './Header';

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
              <div class="card">
                <div class="card-header bg-secondary">
                  My Projects
                </div>
                <div class="card-body">
                  <h5 class="card-title">View all your projects</h5>
                  <Link to={"/ContentsProfessor/"} class="btn btn-primary stretched-link">View</Link>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-header bg-secondary">
                  Add Project
                </div>
                <div class="card-body">
                  <h5 class="card-title">Add a new project</h5>
                 <Link to={"/Addprojectform/"} class="btn btn-primary stretched-link">Add</Link>
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
