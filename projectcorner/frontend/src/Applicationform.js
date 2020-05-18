import React from 'react'
import './Loginform.css'
import Navigationbar from './Navigationbar'


class Applicationform extends React.Component {

  constructor(props) {
    super(props)
    this.state={

      project_id:"",
      name:"",
      enrollment_id:"",
      department:"",
      email_id:"",
      cgpa:"",
      statement_of_purpose:"",
      applied:false,
    }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {

          fetch('http://localhost:8000/projects/api/applications/', {
            method: 'POST',
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
            body:JSON.stringify( {

                      "project_id": this.props.match.params.project_id,
                      "name":this.state.name,
                      "enrollment_id":this.state.enrollment_id,
                      "department":this.state.department,
                      "email_id":this.state.email_id,
                      "cgpa":this.state.cgpa,
                      "statement_of_purpose":this.state.statement_of_purpose,
                  }),
          })
            .then(res => res.json())
            .then(json => {
              this.setState({
                applied:true
              });

            }
            )
            event.preventDefault();

      event.preventDefault();
    }

    render() {

        const applied_alert = () =>{

            if(this.state.applied)
            {
              return(<div class="alert alert-primary">Successfully Applied</div>)
            }
            else
            {
              return
            }

        }


      return (
        <div>
        <Navigationbar />
        <div class="form-container">
          <div class="form-header">
            <h4>Enter Your Details</h4>
          </div>
            <form onSubmit={this.handleSubmit}>


              Name:
              <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />

              Enrollment id:
              <input type="text" name="enrollment_id" value={this.state.value} onChange={this.handleChange} />

              Department:
              <input type="text" name="department" value={this.state.value} onChange={this.handleChange} />

              Email id:
              <input type="text" name="email_id" value={this.state.value} onChange={this.handleChange} />

              CGPA:
              <input type="text" name="cgpa" value={this.state.value} onChange={this.handleChange} />

              Statement Of Purpose:
              <input type="text" name="statement_of_purpose" value={this.state.value} onChange={this.handleChange} />



            <br/>

            <input class="btn btn-primary" value="Submit" type="submit"/>
            </form>
            <br/>
            {applied_alert()}
        </div>
        </div>

            )


      }

}


export default Applicationform
