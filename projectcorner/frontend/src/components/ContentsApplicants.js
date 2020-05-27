import React from 'react'
import '../css/Contents.css'
import Header from './Header'
import Navigationbar from './Navigationbar'
import {Redirect,Link}  from 'react-router-dom';
class ContentsApplicants extends React.Component {
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

     let url2 = "http://127.0.0.1:8000/projects/api/applications/?project_id="+this.props.match.params.project_id
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
           <Header content="Applicants" />
           <table class="table table-hover">
           <thead class="thead-dark">
               <tr>
                 <th>Name</th>
                 <th>Enrollment Id</th>
                 <th>Department</th>
                 <th>CGPA</th>
                 <th>Details</th>
               </tr>
             </thead>
           <tbody>
         {this.state.items.map(item =>(

        <tr>
          <td>{item.name}</td>
          <td>{item.enrollment_id}</td>
          <td>{item.department}</td>
          <td>{item.cgpa}</td>
          <td><Link to={`/ApplicantDetails/${item.id}`} class="btn btn-dark">Details</Link></td>
        </tr>
       ))}

             </tbody>
        </table>
       </div>
     </div>
     )
   }

}


export default ContentsApplicants
