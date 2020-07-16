import React from 'react'
import '../css/Contents.css'
import Header from './Header'
import {Link , Redirect} from 'react-router-dom'
import Navigationbar from './Navigationbar'
import {PROJECT_ROUTE,PROJECT_OPEN,PROJECT_CLOSED} from '../Api.js'

class ContentsProfessor extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isLoaded : false,
      items :[],
    }

  }


  componentDidMount() {
    this.fetchdata()
  }

   fetchdata(){

     var that = this
     let url2 =`${PROJECT_ROUTE}?professor_id=${localStorage.getItem('user_id')}`
     fetch(url2, {headers: {
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
       )
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


     const isLoaded = this.state.isLoaded


     return(
       <div>
       <Navigationbar />
       <div class="container">
       <Header content="project" />
      {isLoaded?null:<div class="spin-container"><div class="spinner spinner-grow text-success"></div><h4>Loading...</h4></div>}
       {this.state.items.map(item =>(
           <div class="card" id="card" >
              <div class="card-body">
                <h4 class="card-title" id="card-title">{item.title}</h4>
                <p class="card-text"><b>Technologies used: </b>{item.tech_used}</p>
                <div class="card-text"><b>Criterion: </b>{item.criterion}</div>
                <br/>
                <Link to={`/ContentsApplicants/${item.id}`} class="btn btn-primary">See Applicants</Link>
                {item.project_status.id===PROJECT_OPEN?<Link to={`/Closeproject/${item.id}/${PROJECT_CLOSED}`} class="btn btn-warning">Close</Link>:
                <Link to={`/Closeproject/${item.id}/${PROJECT_OPEN}`} class="btn btn-success">Open{item.project_status.id}</Link>
                }
                <Link to={`/Deleteproject/${item.id}`} class="btn btn-danger float-right">Delete</Link>
              </div>
            </div>
       ))}
     </div>
     </div>
     )
   }

}


export default ContentsProfessor
