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

                  <Route path="/article/:id">
                     <Article />
                  </Route>

                  <Route path="/category/:id">
                     <ArticleList page={0} pageSize={10} />
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

function Article()
{
   let { id } = useParams();
   return <ArticlePage id={id} />;
}

function Category()
{
   let { id } = useParams();
   return <CategoryPage id={id} />;
}

export default Blog;