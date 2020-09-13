import React from 'react'
import '../css/Contents.css'
import Header from './Header'
import {Link} from 'react-router-dom'
import Navigationbar from './Navigationbar'
import {Redirect} from 'react-router-dom';
import {PROJECT_ROUTE, APPLICATION_ROUTE} from '../Api.js'

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

     let url2 =`${PROJECT_ROUTE}`
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

       let url = `${APPLICATION_ROUTE}?student_id=${user_id}`;
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
        <Header content="All Projects" />
       <div class="container">







      {isLoaded?null:<div class="spin-container"><div class="spinner spinner-grow text-success"></div><h4>Loading...</h4></div>}
       {this.state.items.map(item =>(
           <table className="table table-hover">
        <tbody>
          <tr>
            <td id="linkdata">
              <article id className="post-137294 post type-post status-publish format-standard hentry category-interview-experiences tag-amazon">
                <header className="entry-header">
                <Link to={`/ProjectDetails/${item.id}`} >
                  <h2 className="entry-title">
                    {item.title}
                    &nbsp;
                  </h2>
                  </Link>
                </header>
                {/* entry-header */}
                <div className="entry-summary">
                  {/* Ico nic One home page thumbnail with custom excerpt */}
                  <div className="excerpt-thumb">
                  </div>
                  <p>Technologies used:{item.tech_used}</p>
                  <p>Criteria:{item.criterion}</p>
                </div>
                <div>
                  {
                    item.project_status.id=="1"?(
                      this.state.applied_items.includes(item.id) ? <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn-dark-nohover">Applied</button>
                      :<Link to={`/Applicationform/${item.id}`}>
                      <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn">Apply</button>
                      </Link>
                    )
                    :  <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn-dark-nohover">Closed</button>
                  }
                  <Link to={`/ProjectDetails/${item.id}`} class="float-right">
                  <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn">Details</button>
                  </Link>
                </div>
              </article>{/* #post */}
            </td>
          </tr>
        </tbody>
      </table>
       ))}




     </div>
     </div>


     )
   }

}


export default Contents
