import React from 'react';
import '../css/ApplicantDetails.css'
import img_avatar from '../images/img_avatar.png'
import Header from './Header'
import Navigationbar from './Navigationbar'

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
    }

  }


  componentDidMount(){
    this.fetchdata()
  }

  fetchdata(){

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
          })
        },
      )
  }

  render(){

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
       </div>
      </div>
    )

  }

}

export default ApplicantDetails;
