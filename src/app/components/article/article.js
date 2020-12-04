import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./article.css";

import FacebookIcon from "../../../res/icon/facebook.svg";
import TwitterIcon from "../../../res/icon/gorjeo.svg";
import WhatsappIcon from "../../../res/icon/whatsapp.svg";

class Article extends Component
{
   constructor(props)
   {
      super(props);
   }

   render()
   {
      return <div className="article z-depth-1">
         <div className="article-cover" style={{
            backgroundImage: 'url("' + this.props.cover + '")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover"
         }}></div>

         <div className="article-content">
            <div className="article-title">
               <div className="article-tags-container">
                  {(() => {
                     let tags = [];

                     for(let i = 0; i < this.props.tags.length; ++i)
                     {
                        const tag = this.props.tags[i];

                        tags.push(<div key={`article-tag-${this.props.name}-${tag}`} className="article-tag">
                           <Link to={`/category/${tag}`}>
                              <span className="grey-text text-lighten-1">
                                 {tag}
                              </span>
                           </Link>
                        </div>);
                     }

                     return tags;
                  })()}
               </div>

               <h4><Link to={`/article/${this.props.name}`}>
                  <span className="grey-text text-darken-4">
                     {this.props.title}
                  </span>
               </Link></h4>
            </div>

            <div className="article-body">
               <span className="article-body-text">{this.props.content}</span>
               <div className="article-body-readmore">
                  <Link to={`/article/${this.props.name}`}>READ MORE</Link>
               </div>
            </div>

            <div className="article-footer">
            <div className="social-icon">
                  <a href="#"><img src={FacebookIcon} /></a>
               </div>

               <div className="social-icon">
                  <a href="#"><img src={TwitterIcon} /></a>
               </div>

               <div className="social-icon">
                  <a href="#"><img src={WhatsappIcon} /></a>
               </div>
            </div>
         </div>
      </div>;
   }
};

export default Article;