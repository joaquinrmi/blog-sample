import React, { Component } from "react";
import {
   Route,
   Switch
} from "react-router-dom";

import Blog from "./components/blog/";
import AdminPanel from "../pages/admin_panel/";

import "./app.css";

class App extends Component
{
   constructor(props)
   {
      super(props);
   }

   render()
   {
      return <div>
         <Switch>
            <Route path="/secret/admin-panel">
               <AdminPanel />
            </Route>

            <Route path="/">
               <Blog />
            </Route>
         </Switch>
      </div>;
   }
};

export default App;