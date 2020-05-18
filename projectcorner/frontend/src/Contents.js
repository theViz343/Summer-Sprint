import React from 'react'
import './Contents.css'
import Header from './Header'
import {Link} from 'react-router-dom'
import Navigationbar from './Navigationbar'


class Contents extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isLoaded : "a",
      items :[]
    }

  }

  componentDidMount() {
    this.fetchdata()
  }

   fetchdata(){

     let url="http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=f0597c3b2f81427ca2c47ae854474efb"
     let url2 ="http://127.0.0.1:8000/projects/api/projects/"
     fetch(url2,{headers: {
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
                <Link to={`/Applicationform/${item.id}`} class="btn btn-primary">Apply</Link>
              </div>
            </div>
       ))}

     </div>
     </div>
     )
   }

}


export default Contents
