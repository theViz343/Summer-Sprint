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
class Routes extends Component {
    render() {
        return (
            <div className="site">

                    <Switch>
                        <Route exact path={"/"} component={Loginform}/>
                        <Route exact path={"/Contents/"} component={Contents}/>
                        <Route exact path={"/Header/"} component={Header}/>
                        <Route exact path={"/Footer/"} component={Footer}/>
                        <Route exact path={"/ContentsProfessor/:professor_id"} component={ContentsProfessor}/>
                        <Route exact path={"/ContentsApplicants/:project_id"} name="ContentsApplicants" component={ContentsApplicants}/>
                        <Route exact path={"/Applicationform/:project_id"} component={Applicationform}/>
                        <Route exact path={"/Addprojectform/"}  component={Addprojectform}/>
                        <Route exact path={"/Logout/"} component={Logout}/>

                    </Switch>
            </div>


        );
    }
}

export default Routes;
