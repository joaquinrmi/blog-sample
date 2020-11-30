import React, { Component } from "react";

import "./article.css";

class Article extends Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         loaded: false
      };
   }

   render()
   {
      let content;
      if(!this.state.loaded)
      {
         content = <div className="article-container">
            <div className="loading loading-img"></div>
            <div className="loading loading-title"></div>
            <div className="loading loading-text"></div>
            <div className="loading loading-text"></div>
            <div className="loading loading-text"></div>
            <div className="loading loading-text"></div>
            <div className="loading loading-text"></div>
         </div>;
      }
      else
      {
         content = <div className="article-container"></div>;
      }

      return content;
   }
};

export default Article;