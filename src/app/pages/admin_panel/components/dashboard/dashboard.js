import React, { Component } from "react";
import CreateArticleForm from "../create-article-form";

import "./dashboard.css";

class Dashboard extends Component
{
   constructor(props)
   {
      super(props);
   }

   componentDidMount()
   {
      const el = document.getElementById("dashboard-tabs");
      M.Tabs.init(el, {});
   }

   render()
   {
      return <div className="dashboard">
         <div className="dashboard-tools">
            <div className="row">
               <div className="col s12">
                  <ul className="tabs" id="dashboard-tabs">
                     <li className="tab col s4">
                        <a href="#create-article">
                           Nueva entrada
                        </a>
                     </li>

                     <li className="tab col s4">
                        <a href="#manage-articles">
                           Entradas creadas
                        </a>
                     </li>

                     <li className="tab col s4">
                        <a href="#advanced-tools">
                           Herramientas avanzadas
                        </a>
                     </li>
                  </ul>
               </div>

               <div id="create-article" className="dashboard-tab">
                  <CreateArticleForm />
               </div>

               <div id="manage-articles" className="dashboard-tab"></div>

               <div id="advanced-tools" className="dashboard-tab">
                  <button className="btn">Eliminar todas las entradas</button>
               </div>
            </div>
         </div>
      </div>
   }
};

export default Dashboard;