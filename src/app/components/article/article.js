import React, { Component } from "react";

import "./article.css";

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
            backgroundImage: 'url("https://miro.medium.com/max/9856/1*ZoOlQLNrOW2729miRvO1sw.jpeg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover"
         }}></div>
         <div className="article-content">
            <div className="article-title">
               <h5>First article</h5>
            </div>

            <div className="article-body">
               <span className="article-body-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id ipsum sed purus semper scelerisque in ac ipsum. Nulla ac eros eu ante ornare pretium sed quis turpis. Sed feugiat tellus lectus, nec viverra ante placerat quis. Duis aliquam pulvinar nunc. Praesent magna purus, cursus ac odio ac, placerat hendrerit tellus. Quisque consequat est eget ultricies convallis. Nulla facilisi.</span>
               <div className="article-body-readmore">
                  <a href="#">READ MORE</a>
               </div>
            </div>

            <div className="article-footer"></div>
         </div>
      </div>;
   }
};

export default Article;