const express = require("express");
const router = express.Router();
const error = require("../auth/session_error");

const userValidation = require("../validation/user_validation");
const auth = require("../auth/");

const Article = require("../model/article");
const User = require("../model/user");

/*
   Método POST para crear una nueva cuenta.
*/
router.post("/signup", async (req, res) => {
   if(!req.body)
   {
      return res.json({
         status: false,
         error: new error.EmptyForm()
      });
   }

   if(!userValidation.validateUsername(req.body.username))
   {
      return res.json({
         status: false,
         error: new error.InvalidUsername()
      });
   }
   if(!userValidation.validateEmail(req.body.email))
   {
      return res.json({
         status: false,
         error: new error.InvalidEmail()
      });
   }
   if(!userValidation.validatePassword(req.body.password))
   {
      return res.json({
         status: false,
         error: new error.InvalidPassword()
      });
   }

   try
   {
      var user = await auth.signup(req, res, req.body, req.body.key);
   }
   catch(err)
   {
      console.log("No se ha podido crear una cuenta");
      return res.json({
         status: false,
         error: error
      });
   }

   console.log("Cuenta creada exitosamente");
   res.json({ status: true, username: user.username });
});

/*
   Método POST para iniciar sesión.
*/
router.post("/login", async (req, res) => {
   if(!req.body)
   {
      return res.json({
         status: false,
         error: new error.EmptyForm()
      });
   }

   try
   {
      var user = await auth.login(req, res, req.body.username, req.body.password);
   }
   catch(err)
   {
      return res.json({
         status: false,
         error: err
      });
   }

   res.json({ status: true, username: user.username });
});

/*
   Método POST para cerrar la sesión actual si es que existe.
*/
router.post("/logout", async (req, res) => {
   await auth.logout(req, res, req.body.username);

   res.json({ status: true });
});

/*
   Método POST para restaurar una sesión con la cookie de sesión.
*/
router.post("/restore-session", async (req, res) => {
   if(!req.body)
   {
      return res.json({
         status: false,
         error: new error.EmptyForm()
      });
   }

   try
   {
      var user = await auth.getUser(req, res);
   }
   catch(err)
   {
      return res.json({
         status: false,
         error: err
      });
   }

   res.json({ status: true, username: user.username });
});

/*
   Método POST para generar una nueva clave de administración.
*/
router.post("/generate-admin-key", async (req, res) => {
   try
   {
      var user = await auth.getUser(req, res);
      var key = await auth.generateAdminKey(user, req.body.type);
   }
   catch(err)
   {
      return res.json({
         status: false,
         error: err
      });
   }

   res.json({ status: true, key });
});

/*
   Método POST para la creación de un nuevo artículo.
*/
router.post("/create-article", async (req, res) => {
   if(!req.body)
   {
      return res.json({
         status: false,
         error: new error.EmptyForm()
      });
   }

   try
   {
      var user = await auth.getUser(req, res);
   }
   catch(err)
   {
      return res.json({
         status: false,
         error: err
      });
   }

   if(!auth.checkPermissions(user, "create_article"))
   {
      return res.json({
         status: false,
         error: new error.PermissionDenied()
      });
   }

   const name = req.body.title.split(" ").join("-").toLowerCase();
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
   article.title = req.body.title;
   article.tags = req.body.tags.split(" ").join("").split(",");
   article.content = req.body.content.split("\n");
   article.cover = req.body.cover;
   article.author = user._id;

   await article.save();

   res.json({ status: true });
});

/*
   Elimina todos los artículos.
*/
router.post("/erase-many-articles", async (req, res) => {
   try
   {
      var user = await auth.getUser(req, res);
   }
   catch(err)
   {
      return res.json({
         status: false,
         error: err
      });
   }

   if(!auth.checkPermissions(user, "erase_many_articles"))
   {
      return res.json({
         status: false,
         error: new error.PermissionDenied()
      });
   }

   const articles = await Article.find({});
   for(let i = 0; i < articles.length; ++i)
   {
      const author = await User.findOne({ _id: articles[i].author }).exec();
      const articleIndex = author.articles.indexOf(articles[i]._id);
      author.articles.splice(articleIndex, 1);

      await User.updateOne({ _id: author._id });
   }

   res.json({ status: true });
});

module.exports = router;