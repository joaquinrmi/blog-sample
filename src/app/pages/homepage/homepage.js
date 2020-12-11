import React, { Component } from "react";

import ArticleList from "../../components/article_list/";

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
         <div className="article-container">
            <ArticleList name="homepage" page={0} pageSize={10} />
         </div>
      </div>
   }
};

export default Homepage;