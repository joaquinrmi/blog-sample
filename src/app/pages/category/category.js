import React, { Component } from "react";

import LoadingArticle from "../../components/loading_article";
import Article from "../../components/article";

import "./category.css";

class Category extends Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         loaded: false
      };

      this.articles = [];

      this.setData = this.setData.bind(this);
   }

   setData(articleArray)
   {
      this.articles = [
         {
            name: "first-article",
            title: "First article",
            tags: ["news", "animals", "example"],
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id ipsum sed purus semper scelerisque in ac ipsum. Nulla ac eros eu ante ornare pretium sed quis turpis. Sed feugiat tellus lectus, nec viverra ante placerat quis. Duis aliquam pulvinar nunc. Praesent magna purus, cursus ac odio ac, placerat hendrerit tellus. Quisque consequat est eget ultricies convallis. Nulla facilisi.",
            cover: "https://miro.medium.com/max/9856/1*ZoOlQLNrOW2729miRvO1sw.jpeg"
         },
         {
            name: "second-article",
            title: "Second article",
            tags: ["news", "animals", "example"],
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id ipsum sed purus semper scelerisque in ac ipsum. Nulla ac eros eu ante ornare pretium sed quis turpis. Sed feugiat tellus lectus, nec viverra ante placerat quis. Duis aliquam pulvinar nunc. Praesent magna purus, cursus ac odio ac, placerat hendrerit tellus. Quisque consequat est eget ultricies convallis. Nulla facilisi.",
            cover: "https://www.cpomagazine.com/wp-content/uploads/2020/03/years-old-fox-kitten-cyber-espionage-campaign-targeting-vpn-vulnerabilities-has-given-iran-a-global-foothold_1500.jpg.webp"
         }
      ];
      this.setState({ loaded: true });
   }

   componentDidMount()
   {
      /*
         Acá habrá que obtener los datos del servidor.
      */

      setTimeout(() => { this.setData(); }, 2000);
   }

   render()
   {
      let content;

      if(this.state.loaded)
      {
         content = <div className="category-container">
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
         content = <div className="category-container">
            <LoadingArticle />
            <LoadingArticle />
            <LoadingArticle />
         </div>;
      }

      return content;
   }
};

export default Category;