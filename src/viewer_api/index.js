const express = require("express");
const router = express.Router();

const Article = require("../model/article");
const Tag = require("../model/tag");

/*
   Obtener una lista de descripciones de artículos.
*/
router.get("/article-list", async (req, res) => {
   let skip = req.query.min;
   let limit = req.query.limit;

   if(typeof skip != "number" || skip < 0)
   {
      skip = 0;
   }

   if(typeof limit != "number" || limit < 0)
   {
      limit = 0;
   }

   const articles = await Article.find({}, "name title tags content cover author", { skip, limit }).exec();

   for(let i = 0; i < articles.length; ++i)
   {
      articles[i]._id = undefined;
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