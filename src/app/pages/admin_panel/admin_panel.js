import React, { Component } from "react";
import {
   Switch,
   Route,
   Redirect
} from "react-router-dom";

import "./admin_panel.css";
import Login from "./components/login";
import Signup from "./components/signup";

class AdminPanel extends Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         loggedIn: false,
         username: ""
      };

      this.login = this.login.bind(this);
   }

   login(username)
   {
      this.setState({ loggedIn: true, username });
   }

   render()
   {
      return <div className="admin-panel">
         <Switch>
            <Route exact path="/secret/admin-panel/login">
               <Login loggedIn={this.state.loggedIn} login={this.login} />
            </Route>

            <Route exact path="/secret/admin-panel/signup">
               <Signup loggedIn={this.state.loggedIn} login={this.login} />
            </Route>

            <Route path="/secret/admin-panel/">
               {this.state.loggedIn ? <div></div> : <Redirect to="/secret/admin-panel/login" />}
            </Route>
         </Switch>
      </div>
   }
};

export default AdminPanel;