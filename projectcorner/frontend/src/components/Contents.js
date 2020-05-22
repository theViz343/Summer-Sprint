import React from 'react'
import '../css/Contents.css'
import Header from './Header'
import {Link , Redirect} from 'react-router-dom'
import Navigationbar from './Navigationbar'


class Contents extends React.Component {
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

     // let url="http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=f0597c3b2f81427ca2c47ae854474efb"
     let url2 ="http://127.0.0.1:8000/projects/api/projects/"
     fetch(url2,{headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }})
       .then(res => res.json())
       .then(
         (result) => {
           this.setState({
             isLoaded: "b",
             items: result,

           })
         },
       ).catch(
         e=> {
           //handle some exception
         }
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

     return(



       <div>
        <Navigationbar />
       <div className="container">


       {this.state.items.map(item =>(
           <div className="card" >
              <div className="card-body">
                <h4 className="card-title">{item.title}</h4>
                <p className="card-text">{item.description}</p>
                <p className="card-text"><b>Technologies used: </b>{item.tech_used}</p>
                <div className="card-text"><b>Criterion: </b>{item.criterion}</div>
                <br/>
                <Link to={`/Applicationform/${item.id}`} className="btn btn-primary">Apply</Link>
              </div>
            </div>
       ))}

     </div>
     </div>
     )
   }

}


export default Contents;
