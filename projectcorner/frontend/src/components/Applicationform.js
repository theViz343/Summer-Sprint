import React from 'react'
import Header from './Header'
import '../css/Loginform.css'
import '../css/applicationform.css'
import Navigationbar from './Navigationbar'
import {Redirect} from 'react-router-dom';
import {APPLICATION_ROUTE} from '../Api.js'


class Applicationform extends React.Component {

  constructor(props) {
    super(props)
    this.state={

      project_id:"",
      student_id:"",
      name:"",
      enrollment_id:"",
      department:"",
      email_id:"",
      cgpa:"",
      statement_of_purpose:"",
      applied:false,
      error: '',
      resume : null
    }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
    handleResumeChange = e => {
      this.setState({
        resume: e.target.files[0]
      })
    }

    handleSubmit(event) {
          event.preventDefault();
          this.setState({value:''})
          let form_data = new FormData();
          form_data.append('project_id' , this.props.match.params.project_id)
          form_data.append("student_id" , localStorage.getItem('user_id'))
          form_data.append("application_status_id" , "2")
          form_data.append('statement_of_purpose' , this.state.statement_of_purpose)
          form_data.append('is_selected' , false)
          form_data.append('resume' , this.state.resume , this.state.resume.name)

          fetch(`${APPLICATION_ROUTE}`, {
            method: 'POST',
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`,
            },
            body:form_data
          })
            .then(res => res.json())
            .then(json => {
                if(json.detail == null)
                {
                  this.setState({
                    applied:true
                  });
                }
                else if(json.detail === "You do not have permission to perform this action.")
                {
                  this.setState({
                    error : 'you are not authorized for this action'
                  });
                }
              }
            )

    }

    render() {

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



        const message_alert = () =>{

            if(this.state.applied)
            {
              return(<div class="alert alert-primary">Successfully Applied</div>)
            }
            else if(this.state.error)
            {
              return(<div class="alert alert-danger">{this.state.error}</div>)
            }

        }


      return (
        <div>
        <Navigationbar />
        <Header content="Enter Your Details"/>
        <div class="container p-3">
        <div class="form-container">


        <form method="post" name="editprof_form" action onsubmit="return validate_editprof_Form()">
  <div className="container experience-content">
    <div className="row" style={{padding: '0 10px'}}>
      <div className="col-md-offset-2 col-md-8 col-xs-12 mid-content editprofile_form">
        <div className="row">
          <ul>
            <li style={{color: 'red'}}>Error</li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-6 col-xs-12 col-margin">
            <label htmlFor="fname" className="control-label">First Name</label> <br />
            <input type="text" id="fname" className="form-control" defaultValue="{{ person_obj.firstname }}" name="fname" />
            <font color="red"> <div id="fnr_ep"> </div> </font>
          </div>
          <div className="col-md-6 col-xs-12 col-margin">
            <label htmlFor="lname">Last Name</label> <br />
            <input type="text" id="lname" className="form-control" defaultValue="{{ person_obj.lastname }}" name="lname" />
            <font color="red"> <div id="lnr_ep"> </div> </font>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12 col-xs-12 col-margin">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" className="form-control" readOnly defaultValue="{{ person_obj.email }}" name="email" />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-6 col-xs-6 col-margin">
            <label htmlFor="roll_no">Roll Number</label>
            <input type="text" className="form-control" id="roll_no" style={{color: 'grey'}} readOnly defaultValue="{{ person_obj.roll_no }}" name="roll_no" />
          </div>
          <div className="col-md-6 col-xs-6 col-margin">
            <label htmlFor="clg_id">College id</label>
            <input type="text" className="form-control" style={{color: 'grey'}} readOnly defaultValue="{{ person_obj.clg_id }}" id="clg_id" name="clg_id" />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-6 col-xs-6 col-margin">
            <label htmlFor="telephone1">Mobile</label>
            <input type="text" className="form-control" defaultValue="{{ person_obj.telephone1 }}" id="telephone1" name="telephone1" />
            <font color="red"> <div id="mbr1_ep"> </div> </font>
          </div>
          <div className="col-md-6 col-xs-6 col-margin">
            <label htmlFor="telephone2">Telephone</label>
            <input type="text" className="form-control" defaultValue="{{ person_obj.telephone2 }}" id="telephone2" name="telephone2" />
            <font color="red"> <div id="mbr2_ep"> </div> </font>
          </div>
        </div>
        <div className="row editprofile_button_div">
          <input type="button" onclick="display_password_change()" className=" editpass_button btn" defaultValue="Change Password " />
          <div className="password_change" style={{display: 'none', marginTop: '10px'}}>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <label htmlFor="oldpassword">Old Password</label>
              <input type="password" className="form-control" defaultValue id="oldpasssword" name="oldpassword" />
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <label htmlFor="password1">New Password</label>
              <input type="password" className="form-control" defaultValue id="passsword1" name="password1" />
              <font color="red"> <div id="passr1_ep"> </div> </font>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <label htmlFor="password2">Password again</label>
              <input type="password" className="form-control" defaultValue id="passsword2" name="password2" />
              <font color="red"> <div id="passr2_ep"> </div> </font>
            </div>
          </div>
        </div>
        <br />
        <center><input type="submit" className="btn stupo-btn" name="submit" defaultValue="Update" /></center>
        <br /><br />
      </div>
    </div>
  </div>
</form>




            <form onSubmit={this.handleSubmit}>
              Statement Of Purpose:
              <input type="text" name="statement_of_purpose" value={this.state.value} onChange={this.handleChange} required/>
              <br/>
              <div class="file-upload-wrapper" data-text="Select your file!">
                  <input name="file-upload-field" type="file" class="file-upload-field" value=""/>
              </div>
              <span id="filename">Upload Resume/CV</span>
              <label for="file-upload">Browse
              <input type="file" name="resume" id="resume" onChange = {this.handleResumeChange} required/>
              </label>


            <br/>
            <br/>

            <input class="btn btn-primary" value="Submit" type="submit"/>
            </form>
            <br/>
            {message_alert()}
        </div>
        </div>
        </div>

            )


      }

}


export default Applicationform
