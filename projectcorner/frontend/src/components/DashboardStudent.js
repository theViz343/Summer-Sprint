import React from 'react';
import {Link} from 'react-router-dom';
import Navigationbar from './Navigationbar';
import Header from './Header';

class DashboardStudent extends React.Component {
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
                  Applied Projects
                </div>
                <div class="card-body">
                  <h5 class="card-title">View your Applications</h5>
                  <Link to={"/applied_projects/"} class="btn btn-primary stretched-link">Applications</Link>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-header bg-secondary">
                  All Projects
                </div>
                <div class="card-body">
                  <h5 class="card-title">View all the Projects</h5>
                  <Link to={"/Contents/"} class="btn btn-primary stretched-link">Projects</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }

}


export default DashboardStudent;
