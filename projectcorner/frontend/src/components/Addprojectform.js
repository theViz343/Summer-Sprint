import React from 'react'
import '../css/Loginform.css'
import Navigationbar from './Navigationbar'
import {Redirect} from 'react-router-dom';
import {PROJECT_ROUTE,TECHS_ROUTE} from '../Api.js'

class Addprojectform extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      title: "",
      description: "",
      criterion: "",
      added:false,
      is_open:true,
	  all_techs : [],
	  selected_techs : [],
	  techs_send : ''
    }
      this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleTechSelect = this.handleTechSelect.bind(this)
    }

    componentDidMount(){
		fetch(`${TECHS_ROUTE}` , {
			method: 'GET',
			headers: {
				Authorization: `JWT ${localStorage.getItem('token')}`,
			  'Content-Type': 'application/json',
			}
		}).then(data => data.json())
		.then(data => data.map(d => {
			return(
				{value : d.name , display : d.name}
			)
		}))
		.then(data => (
			this.setState({
				all_techs : [{value : '' , display : 'Select Applicable Techs'}].concat(data)
			})
		))
	}

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
	  event.preventDefault();
	  this.setState({techs_send : this.state.selected_techs.join()})
        this.setState({value:''})
      fetch(`${PROJECT_ROUTE}`, {
      method: 'POST',
      headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify( {

                  "professor_id": localStorage.getItem('user_id'),
                  "project_status_id" : "1",
                  "title": this.state.title,
                  "description": this.state.description,
                  "tech_used": this.state.selected_techs,
                  "criterion": this.state.criterion,

            }),
    })
      .then(res => res.json())
      .then(json => {
        if(json.detail == null)
        {
          this.setState({

            title:json.title,
            description:json.description,
            tech_used:json.tech_used,
            criterion:json.criterion,
            added:true,
          });
        }
        else if(json.detail === "You do not have permission to perform this action.")
        {
          this.setState({
            error : "you are not authorized for this"
          })
        }

      }
      )

	}

	handleTechSelect(e){
		var options = e.target.options
		var value = []
		for(var i=0,l=options.length;i<l;i++){
			if(options[i].selected){
				value.push(options[i].value)
			}
		}
		this.setState({selected_techs : value})

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

          if(localStorage.getItem('role') === "student")
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

          if(this.state.added)
          {
            return(<div class="alert alert-primary">Successfully Added project</div>)
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
            <h4>Enter Project Details</h4>
          </div>
            <form onSubmit={this.handleSubmit}>

              Title:
              <input type="text" name="title" value={this.state.value} onChange={this.handleChange} required/>
              Description:
              <input type="text" name="description" value={this.state.value} onChange={this.handleChange} required/>
              Tech Used:
              {/* <input type="text" name="tech_used" value={this.state.value} onChange={this.handleChange} required/> */}
			  <select className = "selectpicker" multiple={true} value={this.state.selected_techs}
			  		onChange={this.handleTechSelect}>
				{this.state.all_techs.map(tech => <option key={tech.value} value={tech.value}>{tech.display}</option>)}
			  </select><br/>
              Criterion:
              <input type="text" name="criterion" value={this.state.value} onChange={this.handleChange} required />

            <br/>
            <input class="btn btn-primary" type="submit" value="Add"/>
            </form>
        </div>
          <br />
          <div>{message_alert()}</div>
          </div>

        </div>


            )


      }

}


export default Addprojectform
