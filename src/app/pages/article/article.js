import React, { Component } from "react";

import "./article.css";

class Article extends Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         loaded: false
      };

      this.setData = this.setData.bind(this);
   }

   setData(articleContent)
   {
      this.cover = "https://miro.medium.com/max/9856/1*ZoOlQLNrOW2729miRvO1sw.jpeg";
      this.title = "First article";
      this.content = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet laoreet metus. Nullam molestie imperdiet mollis. Cras lacinia leo at augue aliquet elementum. Nulla sodales augue enim, in ultrices ex ultrices egestas. Suspendisse ultrices tristique justo id congue. Cras mattis euismod mauris at euismod. Donec mollis enim id elementum eleifend. Proin in feugiat lacus.",
      "Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec condimentum vulputate pulvinar. Ut eu orci vel felis pellentesque blandit. Aliquam a nulla ut erat dictum condimentum eu id ex. Sed vehicula tempus lobortis. Fusce suscipit, ante vitae condimentum ullamcorper, diam arcu mattis quam, id viverra justo velit sed dolor. Nulla scelerisque euismod mollis. Phasellus eget dolor feugiat nisi tempus volutpat a id tellus.",
      "Donec eros elit, pretium vitae placerat quis, cursus molestie lorem. Nam pretium vel est eu vulputate. Etiam quis turpis eget dolor viverra faucibus vitae nec tortor. Morbi vulputate, urna ut congue sodales, ante mauris sagittis lorem, sit amet eleifend dolor metus id tortor. Vestibulum luctus laoreet orci sit amet tincidunt. Mauris a lacinia leo. Sed at porttitor risus. Nam laoreet, turpis et semper tempor, ex lectus pretium leo, eget tincidunt nisl quam eu mi. Pellentesque ultricies arcu sit amet tortor aliquam, vitae malesuada nunc aliquam. Aliquam eleifend purus pharetra lorem posuere convallis. Fusce mollis est non nisl malesuada ornare.",
      "Donec nec ligula id ante euismod fringilla eu et turpis. Cras aliquam nec orci nec feugiat. Donec risus nunc, lacinia sit amet sodales sit amet, tincidunt vel justo. Etiam et lectus convallis, tristique mauris vitae, porttitor magna. Maecenas euismod sagittis maximus. Donec odio lectus, fringilla et orci nec, tincidunt ultrices urna. Sed congue lorem non rutrum aliquam. Pellentesque tincidunt maximus tincidunt. Donec interdum consectetur tortor, non ullamcorper lacus blandit vehicula. Fusce ac porttitor diam. Pellentesque velit elit, efficitur eget imperdiet non, viverra vitae felis. Cras sit amet accumsan dolor. Vivamus a magna ut orci cursus imperdiet sit amet sit amet diam. Aliquam erat volutpat. Aenean mattis nulla id mi porttitor, non varius libero auctor. Nunc ornare vel libero id ornare.",
      "Quisque molestie, ante quis volutpat fermentum, lacus turpis facilisis lorem, non fringilla ligula nisl vel libero. Sed id lorem augue. Etiam velit mauris, dignissim sed odio ac, vestibulum cursus odio. Nam aliquam enim nec urna laoreet pellentesque. Integer porttitor pulvinar dui, ac vehicula neque tincidunt ac. Nulla dignissim magna et libero maximus efficitur. In ac dolor blandit, venenatis neque nec, blandit risus. Suspendisse vulputate ut mauris vitae rhoncus. Suspendisse quis mi tristique, vestibulum orci at, luctus odio. Donec lobortis pulvinar pulvinar. Mauris efficitur sapien nibh, rutrum fermentum nunc placerat vel. Nam accumsan orci ut imperdiet dictum. Nunc id nisl imperdiet, commodo odio in, fringilla purus."];
      this.tags = [
         "animals", "example", "news"
      ];

      this.setState({ loaded: true });
   }

   componentWillMount()
   {
      /*
         Acá hay que obtener los datos del artículo actual.
      */

      console.log("init");
      setTimeout(() => {
         this.setData();
      }, 1000);
      console.log("end");
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
                           <a href={`/category/${this.tags[i]}`}>
                              {this.tags[i]}
                           </a>
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