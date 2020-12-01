const User = require("../model/user");

const AdminInfo = require("./admin_info.json");

/*
   Inicializa el servidor verificando si existe un usuario "admin".
   Si el usuario no existe, entonces lo crea.
*/
async function initialize()
{
   const foundUser = await User.find({ username: "admin" });
   if(!foundUser || foundUser.length == 0)
   {
      const user = new User();
      user.username = AdminInfo.username;
      user.email = AdminInfo.email;
      user.password = AdminInfo.password;
      user.grade = "admin";
      user.articles = [];

      user.save().then(() => {
         console.log('Usuario "admin" creado exitosamente.');
      });
   }
   else
   {
      console.log('El usuario "admin" ya existe.');
   }
}

module.exports = initialize;