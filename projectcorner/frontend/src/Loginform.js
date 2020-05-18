import React from 'react'
import './Loginform.css';
import {Redirect} from 'react-router-dom'
import Routes from './Routes'
import Navigationbar from './Navigationbar'


class Loginform extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id :'',
      username: '',
      password: '',
      isLoaded:"a",
      islogged: false,
      is_student: false,
      token:'',
      error:'',
      items:[],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {

    fetch('http://localhost:8000/auth-token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify( {
                username :this.state.username,
                password :this.state.password,

          })
  })
    .then(res => res.json())
    .then(json => {
      this.setState({
        token:json.token,
      });

      if(this.state.token)
      {
        localStorage.setItem('token',this.state.token)
        localStorage.setItem('username',this.state.username)


        let url2 ="http://127.0.0.1:8000/accounts/api/users/?username="+this.state.username
        fetch(url2, {headers: {
               Authorization: `JWT ${localStorage.getItem('token')}`
           }})
          .then(res => res.json())
          .then(
            (result) => {



              this.setState({
                isLoaded: "b",
                items: result[0],
                islogged:true,
                is_student: result[0].is_student,
                user_id:result[0].id
              })

              localStorage.setItem('user_id',this.state.user_id)


            }
          )


      }
      else {
        this.setState({
          error:"Invalid Credentials",
        });
      }

    });

    event.preventDefault();
  }

  render() {

    const error_alert =()=>{

        if(this.state.error)
        {
              return(<div class="alert alert-danger">{this.state.error}</div>)
        }
        else{
                return(<div></div>)
        }

    }

    if(this.state.islogged)
      {
        if(this.state.is_student)
        {
          return(<Redirect to={{
                  pathname: '/Contents/',
                  state: { username: this.state.username,
                           password: this.state.password
                        }
              }}
          />)
        }
        else {
            return(<Redirect to={{
                    pathname: '/ContentsProfessor/'+this.state.items.id,
                    state: { username: this.state.username,
                             password: this.state.password,
                             token : this.state.token,
                          }
                }}
            />)
          }
      }






    return (
      <div>
      <Navigationbar />
      <div class="form-container">
        <div class="form-header">
          <h4>Enter Your Credentials</h4>
        </div>
          <form onSubmit={this.handleSubmit}>
              Name:
              <input type="text" name="username" value={this.state.value} onChange={this.handleChange} />

              Password:
              <input type="password" name="password" value={this.state.value} onChange={this.handleChange} />
              <br/>
            <button class="btn btn-primary" type="submit" value="Submit" >Login</button>
          </form>
          <br/>
          <div>{error_alert()}</div>
      </div>
      </div>
    );
  }

}

export default Loginform
