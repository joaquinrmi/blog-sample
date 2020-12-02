const express = require("express");
const router = express.Router();

const userValidation = require("../validation/user_validation");
const auth = require("../auth/");

const Article = require("../model/article");

/*
   Método POST para crear una nueva cuenta.
*/
router.post("/signup", async (req, res) => {
   if(!req.body)
   {
      return res.json({ status: false });
   }

   if(!userValidation.validateUsername(req.body.username))
   {
      return res.json({ status: false });
   }
   if(!userValidation.validateEmail(req.body.email))
   {
      return res.json({ status: false });
   }
   if(!userValidation.validatePassword(req.body.password))
   {
      return res.json({ status: false });
   }

   user = await auth.signup(req, res, req.body);
   if(!user)
   {
      console.log("No se ha podido crear una cuenta");
      return res.json({ status: false });
   }

   console.log("Cuenta creada exitosamente");
   return res.json({ status: true, username: req.body.username });
});

/*
   Método POST para la creación de un nuevo artículo.
*/
router.post("/create-article", (req, res) => {
   
});

module.exports = router;