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
      isLoaded :false,
      isLoadedapp:false,
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

     let url2 ="http://127.0.0.1:8000/projects/api/projects/"
     var that = this
     fetch(url2,{headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }})
        .then(res => res.json())
        .then(

         (result) => {

           setTimeout(function() {
             that.setState({
               isLoaded: true,
               items: result,
             })
           },1000);
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
           isLoadedapp: true,
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

      const isLoaded = this.state.isLoaded;


     return(


       <div>
        <Navigationbar />
       <div class="container">
       <Header content="project" />
      {isLoaded?null:<div class="spin-container"><div class="spinner spinner-grow text-success"></div><h4>Loading...</h4></div>}
       {this.state.items.map(item =>(
           <div class="card" id="card">
              <div class="card-body">
                <h4 class="card-title" id="card-title">{item.title}</h4>
                <p class="card-text">{item.description}</p>
                <p class="card-text"><b>Technologies used: </b>{item.tech_used}</p>
                <p class="card-text"><b>Criterion: </b>{item.criterion}</p>
                <p class="card-text"><b>Posted-by: </b>{item.professor.user.username}</p>
                  {
                    item.is_open?(
                      this.state.applied_items.includes(item.id) ? <div class="btn btn-secondary">Applied</div>
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
