import React from 'react'
import '../css/Contents.css'
import Header from './Header'
import Routes from './Routes'
import {Link , Redirect} from 'react-router-dom'
import Navigationbar from './Navigationbar'

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
     let url2 ="http://127.0.0.1:8000/projects/api/projects/?professor_id="+localStorage.getItem('user_id')
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
           },3000);
         },
       )
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
                <p class="card-text">{item.description}</p>
                <p class="card-text"><b>Technologies used: </b>{item.tech_used}</p>
                <div class="card-text"><b>Criterion: </b>{item.criterion}</div>
                <br/>
                <Link to={`/ContentsApplicants/${item.id}`} class="btn btn-primary">See Applicants</Link>
                <Link to={`/Deleteproject/${item.id}`} class="btn btn-danger">Delete</Link>
                {item.is_open?<Link to={`/Closeproject/${item.id}/${!item.is_open}`} class="btn btn-warning">Close</Link>:
                <Link to={`/Closeproject/${item.id}/${!item.is_open}`} class="btn btn-success">Open</Link>
                }

              </div>

            </div>
       ))}
     </div>
     </div>
     )
   }

}


export default ContentsProfessor
