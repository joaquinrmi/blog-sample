import React, { Component } from "react";
import {
   Route,
   Switch,
   useParams
} from "react-router-dom";

import MainHeader from "./components/main_header";
import Footer from "./components/footer";
import Aside from "../components/aside";
import Homepage from "../pages/homepage";
import ArticlePage from "../pages/article";

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

         <div className="app-body content-limit table-container">
            <div className="body-section left-body-section">
            <Switch>
               <Route exact path="/">
                  <Homepage />
               </Route>

               <Route path="/categorie/:id">
                  <Categorie />
               </Route>

               <Route path="/article/:id">
                  <Article />
               </Route>
            </Switch>
            </div>

            <div className="body-section right-body-section">
               <Aside />
            </div>
         </div>

         <Footer />
      </div>;
   }
};

function Categorie()
{
   let { id } = useParams();
   return <span>{id}</span>;
}

function Article()
{
   let { id } = useParams();
   return <ArticlePage id={id} />;
}

export default App;