import React from 'react';
import {Link} from 'react-router-dom';
import Navigationbar from './Navigationbar';
import Header from './Header';
import '../css/Dashboard.css';
import {Redirect} from 'react-router-dom';

class DashboardStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {

    };
  }

  render()
  {

    if( localStorage.getItem( 'token') === null){
       return (
         <Redirect
           to={{
             pathname : '/',
             state :  {
               error : "You need to login first"
             }
           }}
           />
       )
    }
    else{

        if(localStorage.getItem('role') === "professor")
        {
          return(
          <Redirect
            to={{
              pathname : '/',
              state :  {
                error : "Not authorized"
              }
            }}
            />
          )
        }

    }


    return(
      <div>
      <Navigationbar />
        <div class="container">
        <Header content="Welcome" />
          <div class="row">
            <div class="col-sm-6">
              <div class="card dashboard-card">
                <div class="card-body">
                  <h4 class="card-title">My Applications</h4>
                  <p class="card-text">track all your current applications</p>
                  <Link to={"/applied_projects/"} class="btn btn-info dashboard-button">
                      <i class="fa fa-clone fa-dashboard-custom"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card dashboard-card">
                <div class="card-body">
                  <h4 class="card-title">All Projects</h4>
                  <p class="card-text">View all the available projects</p>
                  <Link to={"/Contents/"} class="btn btn-info dashboard-button">
                    <i class="fa fa-list-ul fa-dashboard-custom"></i>
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


export default DashboardStudent;
