import React, { Component } from "react";
import {
   Switch,
   Route,
   Redirect
} from "react-router-dom";
import serverQuery from "../../util/server_query";

import "./admin_panel.css";
import Login from "./components/login";
import Signup from "./components/signup";

class AdminPanel extends Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         loaded: false,
         loggedIn: false,
         username: ""
      };

      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);

      serverQuery.post("/creator/restore-session", {})
      .then(res => res.json())
      .then(data => {
         if(data.status)
         {
            this.setState({
               loaded: true,
               loggedIn: true,
               username: data.username
            });
         }
         else
         {
            console.log(data.error);
            this.setState({ loaded: true });
         }
      });
   }

   login(username)
   {
      this.setState({ loggedIn: true, username });
   }

   logout()
   {
      serverQuery.post("/creator/logout", { username: this.state.username })
      .then(res => {
         this.setState({ loggedIn: false, username: "" });
      });
   }

   render()
   {
      return <div className="admin-panel">
         {this.state.loaded ? <Switch>
            <Route exact path="/secret/admin-panel/login">
               <Login loggedIn={this.state.loggedIn} login={this.login} />
            </Route>

            <Route exact path="/secret/admin-panel/signup">
               <Signup loggedIn={this.state.loggedIn} login={this.login} />
            </Route>

            <Route exact path="/secret/admin-panel/logout">
               {this.state.loggedIn ? <RenderLogout logout={this.logout} /> : <Redirect to="/secret/admin-panel/" />}
            </Route>

            <Route path="/secret/admin-panel/">
               {this.state.loggedIn ? <div>Bien</div> : <Redirect to="/secret/admin-panel/login" />}
            </Route>
         </Switch> : <div>cargando...</div>}
      </div>
   }
};

class RenderLogout extends Component
{
   constructor(props)
   {
      super(props);
   }

   componentDidMount()
   {
      this.props.logout();
   }

   render()
   {
      return <div>cerrando sesión...</div>
   }
};

export default AdminPanel;