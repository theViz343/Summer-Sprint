import React from 'react'
import '../css/Contents.css'
import Header from './Header'
import Navigationbar from './Navigationbar'
import {Redirect,Link}  from 'react-router-dom';
class ContentsApplicants extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isLoaded : false,
      status:"all",
      items :[],
    }
     this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchdata(this.state.status)
  }

   fetchdata(status){

     this.setState({isLoaded:false})
     var that = this;
     let url2 = `http://127.0.0.1:8000/projects/api/applications/?project_id=${this.props.match.params.project_id}&status=${status}`
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

   handleChange(event) {

   this.fetchdata(event.target.value);
   this.setState({
     status:event.target.value
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

     const isLoaded = this.state.isLoaded

    return(
        <div>
          <Navigationbar />
         <div class="container">
           <Header content="Applicants" />
          {isLoaded?
            <div>
            <div class="form-group">
              <label for="cars"><b>Filter:</b></label>
              <select class="form-control" id="cars" onChange={this.handleChange}>
                <option value="all">{this.state.status}</option>
                <option value="selected">Selected</option>
                <option value="Not selected">Not Selected</option>
              </select>
            </div>
           <table class="table table-hover">
           <thead class="thead-dark">
               <tr>
                 <th>Name</th>
                 <th>Enrollment Id</th>
                 <th>Department</th>
                 <th>Details</th>
               </tr>
             </thead>
           <tbody>
         {this.state.items.map(item =>(

        <tr>
          <td>{item.name}</td>
          <td>{item.enrollment_id}</td>
          <td>{item.department}</td>
          <td><Link to={`/ApplicantDetails/${item.id}`} class="btn btn-dark">Details</Link></td>
        </tr>

       ))}

             </tbody>
        </table>
        </div>
        :<div class="spin-container"><div class="spinner spinner-grow text-success"></div><h4>Loading...</h4></div>}
       </div>
     </div>
     )
   }

}


export default ContentsApplicants
