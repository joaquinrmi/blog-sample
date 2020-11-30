import React, { Component } from "react";
import {
   Route,
   Switch,
   useParams
} from "react-router-dom";

import MainHeader from "./components/main_header";
import Homepage from "../pages/homepage";

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
         <MainHeader />
         
         <Switch>
            <Route exact path="/">
               <Homepage />
            </Route>

            <Route path="/section/:id">
               <Section />
            </Route>
         </Switch>
      </div>;
   }
};

function Section()
{
   let { id } = useParams();
   return <span>{id}</span>;
}

export default App;

/*
   Iconos diseñados por <a href="https://www.flaticon.es/autores/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.es/" title="Flaticon"> www.flaticon.es</a>
*/