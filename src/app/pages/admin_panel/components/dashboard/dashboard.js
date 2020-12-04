import React, { Component } from "react";
import serverRequest from "../../../../util/server_query";

import CreateArticleForm from "../create-article-form";

import "./dashboard.css";

class Dashboard extends Component
{
   constructor(props)
   {
      super(props);

      this.eraseManyArticles = this.eraseManyArticles.bind(this);
   }

   eraseManyArticles()
   {
      serverRequest.post("/creator/erase-many-articles", {})
      .then(res => res.json())
      .then(data => {
         if(data.status)
         {
            alert("Se han eliminado todas las entradas.");
         }
      });
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
                  <h5>Eliminar entradas</h5>
                  <p>Las siguientes funciones eliminarán permanentemente y de forma irreversible las entradas indicadas.</p>
                  <button className="btn modal-trigger" href="#erase-many-articles-modal" onClick={ev => {
                     ev.preventDefault();
                     this.eraseManyArticles();
                  }}>Eliminar todas las entradas</button>

                  <div className="modal" id="erase-many-articles-modal">
                     <div className="modal-content"></div>
                     <div className="modal-footer"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   }
};

export default Dashboard;