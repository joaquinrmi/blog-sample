import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import serverQuery from "../../../../util/server_query";

import "./signup.css";

class Signup extends Component
{
   constructor(props)
   {
      super(props);

      this.sendForm = this.sendForm.bind(this);
   }

   sendForm()
   {
      const username = document.getElementById("signup-username").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const key = document.getElementById("signup-key").value;

      serverQuery.post("/secret/admin-panel/signup", {
         username, email, password, key
      })
      .then(res => res.json())
      .then(data => {
         if(data.status)
         {
            this.props.login(username);
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
         <div className="signup z-depth-1">
            <div className="center-text">
               <h5>Crear una cuenta</h5>
            </div>

            <form>
               <div className="row signup-form-body">
                  <div className="col s12 input-field">
                     <input id="signup-username" placeholder="Nombre de usuario" type="text" />
                     <label htmlFor="signup-username">Nombre de usuario</label>
                  </div>

                  <div className="col s12 input-field">
                     <input id="signup-emaill" placeholder="Correo electrónico" type="text" />
                     <label htmlFor="signup-emaill">Correo electrónico</label>
                  </div>

                  <div className="col s12 input-field">
                     <input id="signup-password" placeholder="Contraseña" type="password" />
                     <label htmlFor="signup-password">Contraseña</label>
                  </div>

                  <div className="col s12 input-field">
                     <input id="signup-key" placeholder="Clave de seguridad" type="text" />
                     <label htmlFor="signup-key">Clave de seguridad</label>
                  </div>

                  <div className="center-text">
                     <button className="btn cyan darken-3" type="submit" onClick={ev => {
                        ev.preventDefault();
                        this.sendForm();
                     }}>Crear cuenta</button>
                  </div>
               </div>
            </form>

            <div className="signup-footer center-text">
               ¿Ya tienes una cuenta? <Link to="/secret/admin-panel/login">Iniciar sesión</Link>.
            </div>
         </div>
      </div>
   }
};

export default Signup;