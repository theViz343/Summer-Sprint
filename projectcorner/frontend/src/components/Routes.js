import React, { Component} from "react";
import { Switch, Route, Link} from "react-router-dom";
import Contents from './Contents';
import Header from './Header';
import Footer from './Footer';
import App from './App';
import Loginform from './Loginform'
import ContentsProfessor from './ContentsProfessor'
import ContentsApplicants from './ContentsApplicants'
import Applicationform from './Applicationform'
import Addprojectform from './Addprojectform'
import Logout from './Logout'
import Closeproject from './Closeproject'
import Deleteproject from './Deleteproject'
import Myapplications from './Myapplications'
import AppliedProjects from './AppliedProjects'
class Routes extends Component {
    render() {
        return (
            <div className="site">

                    <Switch>
                        <Route exact path={"/"} render={(props)=><Loginform {...props}/>}/>
                        <Route exact path={"/Contents/"} render={(props)=><Contents {...props}/>}/>
                        <Route exact path={"/Header/"} component={Header}/>
                        <Route exact path={"/Footer/"} component={Footer}/>
                        <Route exact path={"/ContentsProfessor/:professor_id"} component={ContentsProfessor}/>
                        <Route exact path={"/ContentsApplicants/:project_id"} name="ContentsApplicants" component={ContentsApplicants}/>
                        <Route exact path={"/Applicationform/:project_id"} component={Applicationform}/>
                        <Route exact path={"/Closeproject/:project_id/:status"} component={Closeproject}/>
                        <Route exact path={"/Deleteproject/:project_id"} component={Deleteproject}/>
                        <Route exact path={"/Myapplications/:student_id"} component={Myapplications}/>
                        <Route exact path={"/Addprojectform/"}  component={Addprojectform}/>
                        <Route exact path={"/Logout/"} component={Logout}/>
                        <Route exact path={"/applied_projects/"} render={(props)=><AppliedProjects {...props}/>}/>
                    </Switch>
            </div>


        );
    }
}

export default Routes;
