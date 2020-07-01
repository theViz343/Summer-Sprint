import React from 'react'
import Header from './Header'
import Navigationbar from './Navigationbar'
import img_project from '../images/img_project.png'
import {Redirect} from 'react-router-dom';


class ProjectDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isLoaded:false,
      posted_by:"",
      title:"",
      tech_used:"",
      department:"",
      criterion:"",
      description:"",
      email:""
    }

}

  componentDidMount(){
    this.fetchdata()
  }

  fetchdata(){

    let url2 = `http://127.0.0.1:8000/projects/api/projects/${this.props.match.params.project_id}/`
    fetch(url2, {headers: {
           Authorization: `JWT ${localStorage.getItem('token')}`
       }})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            posted_by:result.professor.user.username,
            title:result.title,
            tech_used:result.tech_used,
            department:result.professor.department,
            criterion:result.criterion,
            description:result.description,
            email:result.professor.user.email,
          })
        },
      )
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

    return(
      <div>
      <Navigationbar/>
      <div class="container">
        <Header content="Project Details"/>
       <div class="card" id="applicant_container">
         <h4 class="card-header bg-secondary">Project Information</h4>
        <div class="card-body">
        <div class="row">

          <div class="col-sm-2">
            <img src={img_project} alt="Avatar" id="applicant_img"/>
          </div>
          <div class="col-sm-5">
             <p class="cart-text"><b>Title :</b>{this.state.title} </p>
             <p class="cart-text"><b>Tech used :</b> {this.state.tech_used}</p>
             <p class="cart-text"><b>Criterion :</b>{this.state.criterion} </p>
           </div>
           <div class="col-sm-5">
              <p class="cart-text"><b>Posted-by :</b>{this.state.posted_by}</p>
              <p class="cart-text"><b>Department :</b> {this.state.department}</p>
              <p class="cart-text"><b>Email :</b>{this.state.email}</p>
            </div>
        </div>
        </div>
      </div>

         <div class="card" id="statement_container">
             <h4 class="card-header bg-secondary">Description</h4>
             <div class="card-body">
              <p class="card-text"> {this.state.description}</p>
            </div>
         </div>
       </div>
      </div>
    )

  }


}

export default ProjectDetails
