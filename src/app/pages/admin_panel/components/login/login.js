import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import serverQuery from "../../../../util/server_query";

import "./login.css";

class Login extends Component
{
   constructor(props)
   {
      super(props);

      this.sendForm = this.sendForm.bind(this);
   }

   sendForm()
   {
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      serverQuery.post("/secret/admin-panel/login", {
         username, password
      })
      .then(res => res.json())
      .then(data => {
         if(data.status)
         {
            this.props.login(data.username);
         }
      });
   }

   render()
   {
      if(this.props.loggedIn)
      {
         return <Redirect to="/secret/admin-panel" />;
      }

      return <div className="full-view flex flex-center cyan darken-4">
         <div className="login z-depth-1">
            <div className="center-text">
               <h5>Iniciar sesión</h5>
            </div>

            <form>
               <div className="row login-form-body">
                  <div className="col s12 input-field">
                     <input id="login-username" placeholder="Nombre de usuario" type="text" />
                     <label htmlFor="login-username">Nombre de usuario</label>
                  </div>

                  <div className="col s12 input-field">
                     <input id="login-password" placeholder="Contraseña" type="password" />
                     <label htmlFor="login-password">Contraseña</label>
                  </div>

                  <div className="center-text">
                     <button className="btn cyan darken-3" type="submit" onClick={ev => {
                        ev.preventDefault();
                        this.sendForm();
                     }}>
                        Iniciar sesión
                     </button>
                  </div>
               </div>
            </form>

            <div className="login-footer center-text">
               ¿No tienes una cuenta? <Link to="/secret/admin-panel/signup">Crear una</Link>.
            </div>
         </div>
      </div>
   }
};

export default Login;