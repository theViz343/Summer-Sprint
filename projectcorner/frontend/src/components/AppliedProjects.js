import React from 'react';
import PropTypes from 'prop-types';
import Navigationbar from './Navigationbar'
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Header from './Header';


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
    let url = 'http://localhost:8000/projects/api/applications/?student_id='+user_id;
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
      },3000);


    }).catch(e=>{
      //kya pata kya likhna hai
    })
  }

  render(){

    if( localStorage.getItem( 'token') == null){
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

    const isLoaded = this.state.isLoaded


    return (
      <div>
       <Navigationbar />
      <div className="container">
      <Header content="Applications"/>

      {this.state.applied_list.map(item =>(
          <div className="card" id="card" >
             <div className="card-body">
               <h4 className="card-title" id="card-title">{item.project.title}</h4>
               <p className="card-text">{item.project.description}</p>
               <p className="card-text"><b>Technologies used: </b>{item.project.tech_used}</p>
               <div className="card-text"><b>Criterion: </b>{item.project.criterion}</div>
               <br/>
               {item.is_selected
                 ? <div className="text-success">Congratulations you are selected</div>
                 : <div className="text-danger">Applying on more projects may improve your chance</div>
               }
             </div>
           </div>
      ))}

    {isLoaded?<Link to={"/Contents/"} className="text-center font-weight-bold">Apply on more projects</Link>:<div class="spin-container"><div class="spinner spinner-grow text-success"></div><h4>Loading...</h4></div>}

    </div>
    </div>
    )
  }

};
export default AppliedProjects;
