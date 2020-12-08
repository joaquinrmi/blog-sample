import React, { Component } from "react";
import { Link } from "react-router-dom";
import serverRequest from "../../util/server_query";

import "./article.css";

class Article extends Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         loaded: false
      };

      this.title = null;
      this.content = [];
      this.cover = null;
      this.tags = [];
   }

   componentDidMount()
   {
      serverRequest.get("/view/article", { name: this.props.name })
      .then(res => res.json())
      .then(data => {
         this.title = data.title;
         this.content = data.content;
         this.cover = data.cover;
         this.tags = data.tags;

         this.setState({ loaded: true });
      });
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
         content = <div className="article-page-container">
            <div
               className="article-page-cover"
               style={{
                  backgroundImage: 'url("' + this.cover + '")',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover"
               }}
            ></div>

            <div className="article-page-title">
               <h4>{this.title}</h4>
            </div>

            <div className="article-page-content">
               {(() => {
                  let p = [];

                  for(let i = 0; i < this.content.length; ++i)
                  {
                     p.push(<p key={`article-p-${i}`}>
                        {this.content[i]}
                     </p>);
                  }

                  return p;
               })()}
            </div>

            <div className="article-page-footer">
               <div className="article-page-tags-container">
                  {(() => {
                     let tags = [];

                     for(let i = 0; i < this.tags.length; ++i)
                     {
                        tags.push(<div className="article-page-tag" key={`article-page-tag-${this.tags[i]}`}>
                           <Link to={`/category/${this.tags[i]}`}>
                              {this.tags[i]}
                           </Link>
                        </div>);
                     }

                     return tags;
                  })()}
               </div>
            </div>
         </div>;
      }

      return content;
   }
};

export default Article;