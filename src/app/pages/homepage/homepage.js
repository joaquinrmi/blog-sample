import React, { Component } from "react";

import Aside from "../../components/aside";
import Article from "../../components/article";

import "./homepage.css";

class Homepage extends Component
{
   constructor(props)
   {
      super(props);

      this.articles = [
         {
            title: "First article",
            tags: ["news", "animals", "example"],
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id ipsum sed purus semper scelerisque in ac ipsum. Nulla ac eros eu ante ornare pretium sed quis turpis. Sed feugiat tellus lectus, nec viverra ante placerat quis. Duis aliquam pulvinar nunc. Praesent magna purus, cursus ac odio ac, placerat hendrerit tellus. Quisque consequat est eget ultricies convallis. Nulla facilisi.",
            cover: "https://miro.medium.com/max/9856/1*ZoOlQLNrOW2729miRvO1sw.jpeg"
         },
         {
            title: "Second article",
            tags: ["news", "animals", "example"],
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id ipsum sed purus semper scelerisque in ac ipsum. Nulla ac eros eu ante ornare pretium sed quis turpis. Sed feugiat tellus lectus, nec viverra ante placerat quis. Duis aliquam pulvinar nunc. Praesent magna purus, cursus ac odio ac, placerat hendrerit tellus. Quisque consequat est eget ultricies convallis. Nulla facilisi.",
            cover: "https://www.cpomagazine.com/wp-content/uploads/2020/03/years-old-fox-kitten-cyber-espionage-campaign-targeting-vpn-vulnerabilities-has-given-iran-a-global-foothold_1500.jpg.webp"
         }
      ];
   }

   render()
   {
      return <div className="homepage-container">
         <div className="homepage-body content-limit table-container">
            <div className="table-row">
               <div className="body-section aside-container">
                  <Aside />
               </div>

               <div className="body-section article-container">
                  {(() => {
                     let articles = [];

                     for(let i = 0; i < this.articles.length; ++i)
                     {
                        const article = this.articles[i];

                        articles.push(<Article title={article.title} tags={article.tags} content={article.content} cover={article.cover} />);
                     }

                     return articles;
                  })()}
               </div>
            </div>
         </div>
      </div>
   }
};

export default Homepage;