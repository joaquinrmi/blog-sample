import React, { Component } from "react";
import serverRequest from "../../util/server_query";

import LoadingArticle from "../loading_article/";
import ArticleListSection from "./article_list_section";

import "./article_list.css";

class ArticleList extends Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         sectionCount: 0,
         loaded: false
      };

      this.maxArticleCount = 0;
      this.totalArticleCount = 0;
      this.sections = [];
      this.loading = false;

      this.limit = this.props.pageSize;
      this.skip = this.limit * this.props.page;

      this.loadMore = this.loadMore.bind(this);
      this.loadMoreArticles = this.loadMoreArticles.bind(this);
   }

   loadMoreArticles()
   {
      this.loading = true;
      var skip = this.skip + this.totalArticleCount;

      serverRequest.get("/view/article-list", {
         skip,
         limit: this.limit,
         tag: this.props.tag
      })
      .then(res => res.json())
      .then(data => {
         this.totalArticleCount += data.length;

         if(data.length > 0)
         {
            this.sections.push(data);
            this.setState({ sectionCount: this.state.sectionCount + 1, loaded: true });
            this.loading = false;
            return;
         }

         this.setState({ loaded: true });
         this.loading = false;

      });
   }

   loadMore()
   {
      return <div className="load-more-container">
         <button className="btn" onClick={ev => {
            ev.preventDefault();

            if(!this.loading)
            {
               this.loadMoreArticles();
            }
         }}>Load more</button>
      </div>;
   }

   componentDidMount()
   {
      serverRequest.get("/view/article-count", {
         tag: this.props.tag
      })
      .then(res => res.json())
      .then(data => {
         this.maxArticleCount = data.count;
         this.loadMoreArticles();
      });
   }

   render()
   {
      let content;

      if(this.state.loaded)
      {
         content = <div className="article-list">
            {(() => {
               const sections = [];

               for(let i = 0; i < this.sections.length; ++i)
               {
                  const section = this.sections[i];

                  sections.push(<ArticleListSection key={`${this.props.name}-art-section-${i}`} articles={section} />);
               }

               return sections;
            })()}

            {this.totalArticleCount < this.maxArticleCount ? this.loadMore() : <div></div>}
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