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
            <h6>TAGS</h6>
            <Tag value="news" count={5} />
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
      </span>
   }
};

export default Aside;