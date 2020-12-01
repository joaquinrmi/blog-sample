import React, { Component } from "react";

import "./loading-article.css";

class LoadingArticle extends Component
{
   constructor(props)
   {
      super(props);
   }

   render()
   {
      return <div className="loading-article z-depth-1">
         <div className="loading loading-cover-mini"></div>
         <div className="loading-article-body">
            <div className="loading loading-title"></div>
            <div className="loading loading-text"></div>
            <div className="loading loading-text"></div>
            <div className="loading loading-text"></div>
            <div className="loading loading-text"></div>
         </div>
      </div>;
   }
};

export default LoadingArticle;