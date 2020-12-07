const express = require("express");
const router = express.Router();

const Article = require("../model/article");
const Tag = require("../model/tag");

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

module.exports = router;