import React from 'react'
import '../css/Contents.css'
import Header from './Header'
import {Link} from 'react-router-dom'
import Navigationbar from './Navigationbar'
import {Redirect} from 'react-router-dom';

class Contents extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isLoaded : false,
      items :[],
      applied_items :[]
    }

  }

  componentDidMount() {
    this.fetchdata()
  }

   fetchdata(){
     let user_id = null;
     if(this.props.location.state != null){
       user_id = this.props.location.state.user_id;
     }else{
       user_id = localStorage.getItem('user_id');
     }

     // let url="http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=f0597c3b2f81427ca2c47ae854474efb"
     let url2 ="http://127.0.0.1:8000/projects/api/projects/"
     fetch(url2,{headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }})
       .then(res => res.json())
       .then(
         (result) => {
           this.setState({
             isLoaded: true,
             items: result
           })
         },
       ).catch(e=>{

       })

       let url = 'http://localhost:8000/projects/api/applications/?student_id='+user_id;
       fetch(url ,{headers: {
         Authorization: `JWT ${localStorage.getItem('token')}`
       }} )
       .then(res => res.json())
       .then(data => data.map(item => item.project.id))
       .then(data => {
         this.setState({
           applied_items: data,
           isLoaded: true,
         })
       }).catch(e=>{
         //kya pata kya likhna hai
       })



   }

   render(){



     if( localStorage.getItem( 'token') == null){
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
        <Navigationbar />
       <div class="container">
       <Header content="project" />
       {this.state.items.map(item =>(
           <div class="card" >
              <div class="card-body">
                <h4 class="card-title">{item.title}</h4>
                <p class="card-text">{item.description}</p>
                <p class="card-text"><b>Technologies used: </b>{item.tech_used}</p>
                <div class="card-text"><b>Criterion: </b>{item.criterion}</div>
                <br/>
                  {
                    item.is_open?(
                      this.state.applied_items.includes(item.id) ? <div class="btn btn-primary">You have already applied for this project</div>
                      :<Link to={`/Applicationform/${item.id}`} class="btn btn-primary">Apply</Link>
                    )
                    :  <button class="btn btn-warning">Project is Closed</button>
                  }
              </div>
            </div>
       ))}

     </div>
     </div>
     )
   }

}


export default Contents
