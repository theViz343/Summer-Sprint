import React from 'react';
import PropTypes from 'prop-types';
import Navigationbar from './Navigationbar'
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Header from './Header';
import {APPLICATION_ROUTE,APPLICATION_SELECTED,APPLICATION_NOT_SELECTED} from '../Api.js'



class AppliedProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applied_list : [],
      isLoaded : false,
      user_id : ''
    }
  }

  componentDidMount() {
    let user_id = null;
    if(this.props.location.state != null){
      user_id = this.props.location.state.user_id;
    }else{
      user_id = localStorage.getItem('user_id');
    }

    var that = this
    let url = `${APPLICATION_ROUTE}?student_id=${user_id}`;
    fetch(url ,{headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`
    }} )
    .then(res => res.json())
    .then(data => {

      setTimeout(function() {
        that.setState({
          isLoaded: true,
          applied_list: data,
        })
      },1000);


    }).catch(e=>{

    })
  }

  render(){


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






    const isLoaded = this.state.isLoaded


    return (
      <div>
       <Navigationbar />
       <Header content="Applications"/>
      <div className="container">



      {this.state.applied_list.map(item =>(
          <table className="table table-hover">
        <tbody>
          <tr>
            <td id="linkdata">
              <article id className="post-137294 post type-post status-publish format-standard hentry category-interview-experiences tag-amazon">
                <header className="entry-header">
                <Link to={`/ApplicantDetails/${item.project.id}`} >
                  <h2 className="entry-title">
                    {item.project.title}
                    &nbsp;
                  </h2>
                  </Link>
                </header>
                {/* entry-header */}
                <div className="entry-summary">
                  {/* Ico nic One home page thumbnail with custom excerpt */}
                  <div className="excerpt-thumb">
                  </div>
                  <p>Technologies used:{item.project.tech_used}</p>
                  <p>Criteria:{item.project.criterion}</p>
                </div>
                <div>
                  <Link to={`/ProjectDetails/${item.id}`} class="float-right">
                  <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn">Details</button>
                  </Link>
                  <Link to={`/ApplicantDetails/${item.id}`}>
                  <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn">View Application</button>
                  </Link>
                </div>
              </article>{/* #post */}
            </td>
          </tr>
        </tbody>
      </table>
      ))}

    {isLoaded?<Link to={"/Contents/"} className="text-center font-weight-bold">
    <button type="button" id style={{marginBottom: '3rem'}} className="stupo-btn-dark-nohover">Apply on more projects</button>
    </Link>:<div class="spin-container"><div class="spinner spinner-grow text-success"></div><h4>Loading...</h4></div>}

    </div>
    </div>
    )
  }

};
export default AppliedProjects;
