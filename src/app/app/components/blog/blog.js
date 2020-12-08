import React, { Component } from "react";
import {
   Route,
   Switch,
   useParams
} from "react-router-dom";

import MainHeader from "../main_header/";
import Aside from "../aside/";
import Footer from "../footer/";
import ArticleList from "../../../components/article_list/";

import Homepage from "../../../pages/homepage";
import ArticlePage from "../../../pages/article";

import "./blog.css";

class Blog extends Component
{
   constructor(props)
   {
      super(props);
   }

   render()
   {
      return <div className="blog">
         <MainHeader />

         <div className="app-body content-limit table-container">
            <div className="body-section left-body-section">
               <Switch>
                  <Route exact path="/">
                     <Homepage />
                  </Route>

                  <Route path="/article/:name">
                     <Article />
                  </Route>

                  <Route path="/category/:tag">
                     <Category />
                  </Route>
               </Switch>
            </div>

            <div className="body-section right-body-section">
               <Aside />
            </div>
         </div>

         <Footer />
      </div>
   }
};

function Category()
{
   let { tag } = useParams();
   return <ArticleList key={tag} tag={tag} page={0} pageSize={10} />;
}

function Article()
{
   let { name } = useParams();
   return <ArticlePage name={name} />;
}

export default Blog;