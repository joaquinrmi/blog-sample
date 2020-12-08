const Article = require("../model/article");
const ArticlePopularity = require("../model/article_popularity");
const Tag = require("../model/tag");
const User = require("../model/user");
const error = require("../auth/session_error");

module.exports = {
   createArticle: async function(user, articleData)
   {
      const name = articleData.title.split(" ").join("-").toLowerCase();
      const articleFound = await Article.findOne({ name }).exec();
      if(articleFound)
      {
         return res.json({
            status: false,
            error: new error.ArticleNameAlreadyUsed()
         });
      }

      const article = new Article();
      article.name = name;
      article.title = articleData.title;
      article.tags = articleData.tags.split(" ").join("").split(",");
      article.content = articleData.content.split("\n");
      article.cover = articleData.cover;
      article.author = user._id;
      article.date = new Date(Date.now());
      await article.save();

      const articlePopularity = new ArticlePopularity();
      articlePopularity._id = article._id;
      articlePopularity.visits = 0;
      await articlePopularity.save();

      await this.registerArticleInUser(user, article._id);
      for(let i = 0; i < article.tags.length; ++i)
      {
         console.log("por registrar en tag");
         await this.registerArticleInTag(article.tags[i], article._id);
      }
   },

   eraseArticle: async function(article)
   {
      await this.unbindArticle(article);
      await Article.deleteOne({ _id: article._id });
      await ArticlePopularity.deleteOne({ _id: article._id });
   },

   eraseArticleByName: async function(name)
   {
      const article = await Article.findOne({ name }).exec();
      if(article)
      {
         await this.eraseArticle(article);
      }
   },

   eraseManyArticles: async function()
   {
      const articles = await Article.find({});
      for(let i = 0; i < articles.length; ++i)
      {
         await this.unbindArticle(articles[i]);
      }

      await Article.deleteMany();
      await ArticlePopularity.deleteMany();
   },

   unbindArticle: async function(article)
   {
      const author = await User.findOne({ _id: article.author }).exec();
      const indexInUser = author.articles.indexOf(article._id);
      author.articles.splice(indexInUser, 1);

      await User.updateOne({ _id: author._id }, { articles: author.articles });

      for(let i = 0; i < article.tags.length; ++i)
      {
         const tag = await Tag.findOne({ _id: article.tags[i] }).exec();
         const indexInTag = tag.articles.indexOf(article._id);
         tag.articles.splice(indexInTag, 1);

         if(tag.articles.length == 0)
         {
            await Tag.deleteOne({ _id: tag._id });
         }
         else
         {
            await Tag.updateOne({ _id: tag._id }, { articles: tag.articles });
         }
      }
   },

   registerArticleInUser: async function(user, articleId)
   {
      user.articles.push(articleId);
      await User.updateOne({ _id: user._id }, { articles: user.articles });
   },

   registerArticleInTag: async function(tag, articleId)
   {
      const tagFound = await Tag.findOne({ _id: tag }).exec();
      console.log(tagFound);
      if(tagFound)
      {
         tagFound.articles.push(articleId);
         await Tag.updateOne({ _id: tag }, { articles: tagFound.articles });
         return;
      }

      const newTag = new Tag();
      newTag._id = tag;
      newTag.articles = [ articleId ];
      await newTag.save();
   }
};