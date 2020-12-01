const User = require("../model/user");
const UserSession = require("../model/user_session");

const PERMISSIONS = require("../permissions.json");

const CHAR = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789";

module.exports = {
   checkPermissions: function(user, actionName)
   {
      return PERMISSIONS[user.grade][actionName];
   },

   signup: async function(req, res, userData)
   {
      const userFound = await User.find({ username: userData.username });
      if(userFound && userFound.length > 0)
      {
         return false;
      }

      const userFound = await User.find({ email: userData.email });
      if(userFound && userFound.length > 0)
      {
         return false;
      }

      let user = new User();
      user.username = userData.username;
      user.email = userData.email;
      user.password = userData.password;
      user.grade = "creator";
      user.articles = [];

      await user.save();

      return this.login(req, res, userData.username, userData.password);
   },

   login: async function(req, res, username, password)
   {
      const user = await User.find({ username });
      if(!user || user.length == 0)
      {
         return false;
      }

      if(user[0].password != password)
      {
         return false;
      }

      await this.createSession(req, res, user[0]);

      return user[0];
   },

   logout: async function(req, res, username)
   {
      const user = await User.find({ username });
      if(!user || user.length == 0)
      {
         return false;
      }

      const session = (await UserSession.find({ _id: user._id })) || [];
      this.eraseSession(req, res, session[0]);
   },

   getUser: async function(req, res)
   {
      if(req.session.username)
      {
         if(req.cookies.user)
         {
            const token = req.cookies.user.token.split("-");

            const username = token[0];
            const key = token[1];

            if(req.session.username == username)
            {   
               const user = await User.find({ username });
               if(!user || user.length == 0)
               {
                  return false;
               }

               const session = await UserSession.find({ _id: user[0]._id });
               if(!session || session.length == 0)
               {
                  return false;
               }

               if(!session[0].keys.includes(key))
               {
                  return false;
               }

               res.cookie("user", req.cookies.user, {
                  maxAge: 7 * 24 * 3600 * 1000
               });

               return user[0];
            }

            res.cookie("user", undefined);
         }

         this.eraseSession(req, res);
         return false;
      }

      if(req.cookies.user)
      {
         const user = await this.getUserByCookie(req.cookies.user);
         if(!user)
         {
            return false;
         }

         await this.createSession(req, res, user[0]);
         return user[0];
      }

      return false;
   },

   getUserByCookie: async function(cookie)
   {
      const token = cookie.token.split("-");
      const username = token[0];

      const user = await User.find({ username });
      if(!user || user.length == 0)
      {
         return false;
      }

      return user[0];
   },

   createSession: async function(req, res, user)
   {
      let key = "";
		let keyArray = [];
		for(let i = 0; i < 64; ++i)
		{
			keyArray.push(CHAR[Math.floor(Math.random() * CHAR.length)]);
		}
		key = keyArray.join("");

      const token = user.username + "-" + key;

      res.cookie("user", { token }, {
         maxAge: 7 * 24 * 3600 * 1000
      });

      req.session.username = user.username;
      req.session.save();

      let session = await UserSession.find({ _id: user._id });
      if(!session || session.length == 0)
      {
         session = new UserSession();
         session._id = user._id;
         session.keys = [ key ];

         await session.save();
         return;
      }
      
      session[0].keys.push(key);
      await UserSession.update(
         { _id: session[0]._id }, { keys: session[0].keys }
      );
   },

   eraseSession: function(req, res, session)
   {
      if(session)
      {
         const token = req.cookie.token.split("-");
         const key = token[1];

         const keyPos = session.keys.indexOf(key);
         if(keyPos != -1)
         {
            session.keys.splice(keyPos, 1);
            UserSession.update({ _id: session._id }, { keys: session.keys });
         }
      }

      res.cookie("user", undefined);
      req.session.username = undefined;
      req.session.save();
   }
};