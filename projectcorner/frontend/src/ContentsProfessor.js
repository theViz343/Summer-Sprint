import React from 'react'
import './Contents.css'
import Header from './Header'
import Routes from './Routes'
import {Link} from 'react-router-dom'
import Navigationbar from './Navigationbar'

class ContentsProfessor extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isLoaded : "a",
      items :[],
    }

  }


  componentDidMount() {
    this.fetchdata()
  }

   fetchdata(){

     let url2 ="http://127.0.0.1:8000/projects/api/projects/?professor_id="+this.props.match.params.professor_id
     fetch(url2, {headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`

        }})
       .then(res => res.json())
       .then(
         (result) => {
           this.setState({
             isLoaded: "b",
             items: result
           })
         },
       )
   }

   render(){
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
                <Link to={`/ContentsApplicants/${item.id}`} class="btn btn-primary">See Applicants</Link>

              </div>

            </div>
       ))}
       <Link to={"/Addprojectform/"} class="btn btn-dark" >Add New Project</Link>

     </div>
     </div>
     )
   }

}


export default ContentsProfessor
