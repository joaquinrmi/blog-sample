const express = require("express");
const router = express.Router();
const error = require("../auth/session_error");

const userValidation = require("../validation/user_validation");
const auth = require("../auth/");

const Article = require("../model/article");

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
      var user = await auth.signup(req, res, req.body);
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
   Método POST para la creación de un nuevo artículo.
*/
router.post("/create-article", (req, res) => {
   
});

module.exports = router;