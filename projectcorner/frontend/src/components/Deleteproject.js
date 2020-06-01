import React from 'react';
import {Link} from  'react-router-dom';
import Navigationbar from './Navigationbar'

export default class Deleteproject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_deleted:true,
    }
  }


  componentDidMount(){

    fetch(`http://localhost:8000/projects/api/projects/${this.props.match.params.project_id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        },
      })
  }

  render()
  {

        const error_alert =()=>{

            if(this.state.is_deleted)
            {
                  return(<div class="alert alert-success">Deletion Successful</div>)
            }
            else{
                    return(<div class="alert alert-danger">Deletion Unsuccessful</div>)
            }

      }

      return(
        <div>
          <Navigationbar/>
          <div class="container my-3">
          <div>{error_alert()}</div>
          <Link to={"/ContentsProfessor/"} class="btn btn-dark">Back to Projects</Link>
          </div>
        </div>
      )
  }


}
