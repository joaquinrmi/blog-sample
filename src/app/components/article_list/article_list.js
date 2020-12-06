import React, { Component } from "react";
import serverRequest from "../../util/server_query";

import Article from "../article/";
import LoadingArticle from "../loading_article/";

class ArticleList extends Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         loaded: false
      };

      this.limit = this.props.pageSize;
      this.skip = this.limit * this.props.page;

      this.articles = [];
   }

   componentDidMount()
   {
      serverRequest.get("/view/article-list", {
         skip: this.skip,
         limit: this.limit,
         tag: this.props.tag
      })
      .then(res => res.json())
      .then(data => {
         this.articles = data;
         this.setState({ loaded: true });
      });
   }

   render()
   {
      let content;

      if(this.state.loaded)
      {
         content = <div className="article-list">
            {(() => {
               let articles = [];

               for(let i = 0; i < this.articles.length; ++i)
               {
                  const art = this.articles[i];

                  articles.push(<Article key={`category-article-${art.name}`} name={art.name} title={art.title} content={art.content} tags={art.tags} cover={art.cover} />);
               }

               return articles;
            })()}
         </div>;
      }
      else
      {
         content = content = <div className="article-list">
            <LoadingArticle />
            <LoadingArticle />
            <LoadingArticle />
         </div>;
      }

      return content;
   }
};

export default ArticleList;