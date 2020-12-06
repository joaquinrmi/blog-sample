import React, { Component } from "react";
import { Link } from "react-router-dom";

import serverRequest from "../../../util/server_query";

import "./aside.css";

class Aside extends Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         loaded: false
      };

      this.tags = [];
      this.articles = [
         {
            name: "first-article",
            title: "First article"
         },
         {
            name: "second-article",
            title: "Second article"
         }
      ];
   }

   componentDidMount()
   {
      serverRequest.get("/view/tag-list", {})
      .then(res => res.json())
      .then(data => {
         this.tags = data;
         console.log(data);
         this.setState({loaded: true});
      });
   }

   render()
   {
      return <div className="aside">
         <div className="aside-section">
            <div className="aside-search-container">
               <input className="aside-search" type="text" placeholder="Search" />
               <div className="aside-search-icon">
                  <span className="material-icons none-select">search</span>
               </div>
            </div>
         </div>

         <div className="aside-section">
            <div className="aside-title">
               <h6>CATEGORIES</h6>
            </div>

            <ul className="aside-list">
               {(() => {
                  const tags = [];

                  for(let i = 0; i < this.tags.length; ++i)
                  {
                     const tag = this.tags[i];

                     tags.push(<li key={`aside-tag-${tag.value}`}><Tag value={tag.value} count={tag.count} /></li>);
                  }

                  return tags;
               })()}
            </ul>
         </div>

         <div className="aside-section">
            <div className="aside-title">
               <h6>POPULAR ENTRIES</h6>
            </div>

            <ul className="aside-list">
               {(() => {
                  const articles = [];

                  for(let i = 0; i < this.articles.length; ++i)
                  {
                     const art = this.articles[i];

                     articles.push(<li key={`aside-article-${art.name}`}>
                        <Link to={`/article/${art.name}`}>{art.title}</Link>
                     </li>)
                  }

                  return articles;
               })()}
            </ul>
         </div>
      </div>;
   }
};

class Tag extends Component
{
   constructor(props)
   {
      super(props);
   }

   render()
   {
      return <span className="blog-tag">
         <Link to={`/category/${this.props.value}`}>{this.props.value}</Link>
         <span className="blog-tag-count">({this.props.count})</span>
      </span>
   }
};

export default Aside;