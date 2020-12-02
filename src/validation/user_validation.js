const validator = require("validator");

const letterSet = {
   min: 97, max: 122
};
const capLetterSet = {
   min: 65, max: 90
};
const numberSet = {
   min: 48, max: 57
};

const validUserName = [
   letterSet,
   capLetterSet,
   numberSet,
   { min: 95, max: 95 },
   { min: 45, max: 46 }
];

function validateChar(char, sets)
{
   const code = char.charCodeAt(0);

   for(let i = 0; i < sets.length; ++i)
   {
      if(code >= sets[i].min && code <= sets[i].max)
      {
         return true;
      }
   }

   return false;
}

function verifyExistence(text, set)
{
   for(let i = 0; i < text.length; ++i)
   {
      const code = text.charCodeAt(i);
      if(code >= set.min && code <= set.max)
      {
         return true;
      }
   }

   return false;
}

function verifyInexistence(text, sets)
{
   for(let i = 0; i < text.length; ++i)
   {
      const code = text.charCodeAt(i);

      let found = false;
      for(let j = 0; j < sets.length; ++j)
      {
         if(code >= sets[j].min && code <= sets[j].max)
         {
            found = true;
            break;
         }
      }

      if(!found) return true;
   }

   return false;
}

module.exports = {
   validateUsername: function(username)
   {
      if(!username)
      {
         return false;
      }

      if(username.length > 16)
      {
         return false;
      }

      for(let i = 0; i < username.length; ++i)
      {
         if(!validateChar(username.charAt(i), validUserName))
         {
            return false;
         }
      }

      return true;
   },

   validateEmail: function(email)
   {
      if(!email)
      {
         return false;
      }

      return validator.isEmail(email);
   },

   validatePassword: function(password)
   {
      if(!password)
      {
         return false;
      }

      if(password.length < 8 || password.length > 64)
      {
         return false;
      }

      if(!verifyExistence(password, letterSet))
      {
         return false;
      }
      if(!verifyExistence(password, capLetterSet))
      {
         return false;
      }
      if(!verifyExistence(password, numberSet))
      {
         return false;
      }
      if(!verifyInexistence(password, [
         letterSet, capLetterSet, numberSet
      ]))
      {
         return false;
      }

      return true;
   }
};