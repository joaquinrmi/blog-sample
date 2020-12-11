import React, { Component } from "react";

import Article from "../article/";

class ArticleListSection extends Component
{
   constructor(props)
   {
      super(props);
   }

   shouldComponentUpdate(nextProps, nextState)
   {
      return false;
   }

   render()
   {
      return <div className="article-list-section">
         {(() => {
            let articles = [];

            for(let i = 0; i < this.props.articles.length; ++i)
            {
               const art = this.props.articles[i];

               articles.push(<Article key={`category-article-${art.name}`} name={art.name} title={art.title} content={art.content} tags={art.tags} cover={art.cover} />);
            }

            return articles;
         })()}
      </div>;
   }
};

export default ArticleListSection;