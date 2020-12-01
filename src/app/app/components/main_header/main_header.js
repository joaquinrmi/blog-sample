import React, { Component } from "react";

import "./main_header.css";

class MainHeader extends Component
{
   constructor(props)
   {
      super(props);
   }

   render()
   {
      return <div className="main-header grey darken-4">
         <div className="main-header-title content-limit">
            <div className="row">
               <div className="col s12 m4"></div>

               <div className="col s12 m4">
                  <h1><a className="grey-text darken-1-text" href="/">
                     Blog Sample
                  </a></h1>
               </div>

               <div className="col s12 m4"></div>
            </div>
         </div>

         <div className="main-header-nav content-limit">
            <nav className="transparent">
               <ul>
                  <li className="active"><a href="/">Home</a></li>
                  <li><a href="/category/animals">Animals</a></li>
               </ul>
            </nav>
         </div>
      </div>
   }
};

export default MainHeader;