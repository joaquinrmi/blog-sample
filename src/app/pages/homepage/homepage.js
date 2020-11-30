import React, { Component } from "react";

import Aside from "../../components/aside";
import Article from "../../components/article";

import "./homepage.css";

class Homepage extends Component
{
   constructor(props)
   {
      super(props);
   }

   render()
   {
      return <div className="homepage-container">
         <div className="homepage-body content-limit table-container">
            <div className="table-row">
               <div className="body-section aside-container">
                  <Aside />
               </div>

               <div className="body-section article-container">
                  <Article />
               </div>
            </div>
         </div>
      </div>
   }
};

export default Homepage;