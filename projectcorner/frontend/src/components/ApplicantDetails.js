import React from 'react';
import '../css/ApplicantDetails.css'
import img_avatar from '../images/img_avatar.png'
import Header from './Header'
import Navigationbar from './Navigationbar'

class ApplicantDetails extends React.Component {
  constructor(props){
    super(props)
    this.state={
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
            isLoaded: "b",
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
      <div class="container " id="applicant_container">
        <Header content="Applicant Details"/>
       <div>
         <img src={img_avatar} alt="Avatar" id="applicant_img" class="img-fluid"/>
       </div>

           <h6>Enrollment id:{this.state.enrollment_id} </h6>
           <h6>Name : {this.state.name}</h6>
           <h6>Department :{this.state.department}</h6>
           <h6>Email : {this.state.email}</h6>
           <h6>Mobile no :{this.state.phone}</h6>
           <h6>Project :{this.state.project_title} </h6>

         <div>
             <h6>Statement of purpose:</h6>
             <p> {this.state.statment_of_purpose}</p>
         </div>
       </div>
      </div>
    )

  }

}

export default ApplicantDetails;
