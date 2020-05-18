import React from 'react'
import './Loginform.css'
import Navigationbar from './Navigationbar'

class Addprojectform extends React.Component {

  constructor(props) {
    super(props)
    this.state={

      title: "",
      description: "",
      tech_used: "",
      criterion: "",
      added:"",
    }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {

      fetch('http://localhost:8000/projects/api/projects/', {
      method: 'POST',
      headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',


      },
      body:JSON.stringify( {

                  "professor_id": localStorage.getItem('user_id'),
                  "title": this.state.title,
                  "description": this.state.description,
                  "tech_used": this.state.tech_used,
                  "criterion": this.state.criterion,
            }),
    })
      .then(res => res.json())
      .then(json => {
        this.setState({

          title:json.title,
          description:json.description,
          tech_used:json.tech_used,
          criterion:json.criterion,
        });

      }
      )
      event.preventDefault();
    }

    render(){

      const added_alert = () =>{

          if(this.state.added)
          {
            return(<div class="alert alert-primary">Successfully Added project</div>)
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
            <h4>Enter Project Details</h4>
          </div>
            <form onSubmit={this.handleSubmit}>

              Title:
              <input type="text" name="title" value={this.state.value} onChange={this.handleChange} />
              Description:
              <input type="text" name="description" value={this.state.value} onChange={this.handleChange} />
              Tech Used:
              <input type="text" name="tech_used" value={this.state.value} onChange={this.handleChange} />
              Criterion:
              <input type="text" name="criterion" value={this.state.value} onChange={this.handleChange} />

            <br/>
            <input class="btn btn-primary" type="submit" value="Add"/>
            </form>
        </div>
          <br />
          {added_alert()}


        </div>

            )


      }

}


export default Addprojectform
