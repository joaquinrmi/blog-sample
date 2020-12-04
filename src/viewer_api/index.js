const express = require("express");
const router = express.Router();

const Article = require("../model/article");

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

module.exports = router;