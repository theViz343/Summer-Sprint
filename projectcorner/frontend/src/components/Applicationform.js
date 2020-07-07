import React from 'react'
import '../css/Loginform.css'
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
        <div class="container p-3">
        <div class="form-container">
          <div class="form-header">
            <h4>Enter Your Details</h4>
          </div>
            <form onSubmit={this.handleSubmit}>
              Statement Of Purpose:
              <input type="text" name="statement_of_purpose" value={this.state.value} onChange={this.handleChange} required/>
              <br/>
              Upload Resume  :
              <input type="file" name="resume" id="resume"
                onChange = {this.handleResumeChange} required
                />


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
