const express = require("express");
const router = express.Router();

const Article = require("../model/article");
const Tag = require("../model/tag");
const ArticlePopularity = require("../model/article_popularity");

/*
   Obtener la descripciónd de un artículo
*/
router.get("/article", async (req, res) => {
   if(!req.query.name)
   {
      return res.json({});
   }

   const article = await Article.findOne({ name: req.query.name }).exec();
   if(!article)
   {
      return res.json({});
   }

   const popularity = await ArticlePopularity.findOne({ _id: article._id }).exec();
   await ArticlePopularity.updateOne({ _id: article._id }, { visits: popularity.visits + 1 });

   res.json(article);
});

/*
   Obtener una lista de descripciones de artículos.
*/
router.get("/article-list", async (req, res) => {
   let skip = Number(req.query.skip);
   let limit = Number(req.query.limit);

   if(req.query.tag != "undefined")
   {
      const tag = await Tag.findOne({ _id: req.query.tag }).exec();

      let articles = [];
      for(let i = 0; i < tag.articles.length; ++i)
      {
         const article = await Article.findOne({ _id: tag.articles[i] }).exec();
         article._id = undefined;
         articles.push(article);
      }

      articles.reverse();
      articles.splice(0, skip);
      articles.splice(limit);

      return res.json(articles);
   }

   const articles = await Article.find({}, "name title tags content cover author", { skip, limit }).sort({ date: -1 }).exec();

   for(let i = 0; i < articles.length; ++i)
   {
      articles[i].content = articles[i].content[0];
   }

   res.json(articles);
});

/*
   Obtener una lista con todas las etiquetas.
*/
router.get("/tag-list", async (req, res) => {
   const tagFound = await Tag.find({});
   const tags = [];
   for(let i = 0; i < tagFound.length; ++i)
   {
      tags.push({
         value: tagFound[i]._id,
         count: tagFound[i].articles.length
      });
   }

   res.json(tags);
});

/*
   Obtener una lista con las entradas más populares.
*/
router.get("/popular-articles", async (req, res) => {
   const popularity = await ArticlePopularity.find().limit(10).sort({ visits: -1 }).exec();

   let popularArticles = [];
   for(let i = 0; i < popularity.length; ++i)
   {
      const article = await Article.findOne({ _id: popularity[i]._id }).exec();
      popularArticles.push({
         name: article.name,
         title: article.title
      });
   }

   res.json(popularArticles);
});

module.exports = router;