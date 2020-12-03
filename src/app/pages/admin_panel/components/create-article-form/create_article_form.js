import React, { Component } from "react";

import serverQuery from "../../../../util/server_query";

class CreateArticleForm extends Component
{
   constructor(props)
   {
      super(props);

      this.sendForm = this.sendForm.bind(this);
   }

   sendForm()
   {
      const article = {
         title: document.getElementById("article-title-input").value,
         tags: document.getElementById("article-tags-input").value,
         cover: document.getElementById("article-cover-input").value,
         content: document.getElementById("article-content-textarea").value
      };

      serverQuery.post("/creator/create-article", article)
      .then(res => res.json())
      .then(data => {
         if(data.status)
         {
            document.getElementById("article-title-input").value = "";
            document.getElementById("article-tags-input").value = "";
            document.getElementById("article-cover-input").value = "";
            document.getElementById("article-content-textarea").value = "";
         }
         else
         {
            console.log(data.error);
         }
      })
   }

   render()
   {
      return <form>
         <div className="input-field">
            <input id="article-title-input" type="text" />
            <label htmlFor="article-title-input">Título</label>
         </div>

         <div className="input-field">
            <input id="article-tags-input" type="text" />
            <label htmlFor="article-tags-input">Etiquetas</label>
            <span className="helper-text" data-error="wrong" data-success="right">Escriba las etiquetas separadas por comas.</span>
         </div>

         <div className="input-field">
            <input id="article-cover-input" type="text" />
            <label htmlFor="article-cover-input">Imagen de portada</label>
         </div>

         <div className="input-field">
            <textarea id="article-content-textarea" className="materialize-textarea" />
            <label htmlFor="article-cover-input">Contenido</label>
         </div>

         <button type="sumbit" className="btn" onClick={ev => {
            ev.preventDefault();
            this.sendForm(ev);
         }}>Publicar</button>
      </form>;
   }
};

export default CreateArticleForm;