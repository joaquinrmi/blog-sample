import React, { Component } from "react";
import { Link } from "react-router-dom";

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
                  <h1><Link className="grey-text darken-1-text" to="/">
                     Blog Sample
                  </Link></h1>
               </div>

               <div className="col s12 m4"></div>
            </div>
         </div>

         <div className="main-header-nav content-limit">
            <nav className="transparent">
               <ul>
                  <li className="active"><Link to="/">
                     <span className="grey-text text-lighten-5">
                        Home
                     </span>
                  </Link></li>

                  <li className="active"><Link to="/category/animals">
                     <span className="grey-text text-lighten-5">
                        Animals
                     </span>
                  </Link></li>
               </ul>
            </nav>
         </div>
      </div>
   }
};

export default MainHeader;