import React, { Component } from "react";

import "./aside.css";

class Aside extends Component
{
   constructor(props)
   {
      super(props);
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
               <li><Tag value="Animals" count={2} /></li>
               <li><Tag value="Example" count={2} /></li>
               <li><Tag value="News" count={2} /></li>
            </ul>
         </div>

         <div className="aside-section">
            <div className="aside-title">
               <h6>POPULAR ENTRIES</h6>
            </div>

            <ul className="aside-list">
               <li>
                  <a href="#">First article</a>
               </li>
               <li>
                  <a href="#">Second article</a>
               </li>
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
         <a href="#">{this.props.value}</a>
         <span className="blog-tag-count">({this.props.count})</span>
      </span>
   }
};

export default Aside;