import React from 'react';
import '../css/ApplicantDetails.css'
import img_avatar from '../images/img_avatar.png'
import Header from './Header'
import Navigationbar from './Navigationbar'
import {Redirect} from 'react-router-dom';

class ApplicantDetails extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isLoaded:false,
      name:"",
      enrollment_id:"",
      email:"",
      department:"",
      cgpa:"",
      statment_of_purpose:"",
      project_title:"",
      phone:"",
      is_selected:'',
      project_id : '',
      student_id : '',
      application_id:'',
      resume:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  componentDidMount(){
    this.fetchdata()
  }

  fetchdata(){
    this.setState({application_id :this.props.match.params.application_id })
    let url2 = `http://127.0.0.1:8000/projects/api/applications/${this.props.match.params.application_id}/`
    fetch(url2, {headers: {
           Authorization: `JWT ${localStorage.getItem('token')}`
       }})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            name:result.name,
            enrollment_id:result.enrollment_id,
            email:result.email_id,
            department:result.department,
            cgpa:result.cgpa,
            statment_of_purpose:result.statement_of_purpose,
            project_title:result.project.title,
            phone:result.student.phone_number,
            project_id : result.project.id,
            student_id: result.student.user.id,
            is_selected: result.is_selected,
            resume: result.resume,
          })
        },
      )
  }


  handleSubmit(e)
  {
    e.preventDefault();
    if(window.confirm("Do you want to proceed ?"))
    {
      let form_data = new FormData();
      form_data.append('project_id',this.state.project_id)
      form_data.append('student_id',this.state.student_id)
      form_data.append('is_selected',!this.state.is_selected)

      let url2 = `http://127.0.0.1:8000/projects/api/applications/${this.state.application_id}/`
      fetch(url2, {
        method: 'PATCH',
        headers: {
             Authorization: `JWT ${localStorage.getItem('token')}`,
         },
        body : form_data
      })
        .then(res => res.json())
        .then(res => {
          this.setState({is_selected : res.is_selected})
        }
        )
    }
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
        <Header content="Applicant Details"/>
       <div class="card" id="applicant_container">
         <h4 class="card-header bg-secondary">Applicant Information</h4>
        <div class="card-body">
        <div class="row">

          <div class="col-sm-2">
            <img src={img_avatar} alt="Avatar" id="applicant_img"/>
          </div>
          <div class="col-sm-5">
             <p class="cart-text"><b>Enrollment Id :</b>{this.state.enrollment_id} </p>
             <p class="cart-text"><b>Name :</b> {this.state.name}</p>
             <p class="cart-text"><b>Project :</b>{this.state.project_title} </p>
           </div>
           <div class="col-sm-5">
              <p class="cart-text"><b>Department :</b>{this.state.department}</p>
              <p class="cart-text"><b>Email :</b> {this.state.email}</p>
              <p class="cart-text"><b>Mobile no :</b>{this.state.phone}</p>
            </div>
        </div>
        </div>
      </div>

         <div class="card" id="statement_container">
             <h4 class="card-header bg-secondary">Statement Of Purpose</h4>
             <div class="card-body">
              <p class="card-text"> {this.state.statment_of_purpose}</p>
            </div>
         </div>
         <div class="container my-2">
           {this.state.is_selected
            ? <div class="alert alert-success">You have selected this student !</div>
            :  <div class="alert alert-info">You have not selected this student yet </div>
            }
         </div>
         <div>
            <div class="row">
             <div class="col-sm-2">
              <a href={this.state.resume} target="blank" class="btn btn-dark">View Resume</a>
             </div>
             <div class="col-sm-8">
              {null}
             </div>
             <div class="col-sm-2">
               <form onSubmit={this.handleSubmit}>
                {!this.state.is_selected
                 ? <button class="btn btn-success" type="submit">Select</button>
                 :null
                }
              </form>
            </div>
          </div>
         </div>
       </div>
      </div>
    )

  }

}

export default ApplicantDetails;
