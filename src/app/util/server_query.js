export default {
   get: function(requestInfo, query)
   {
      let queryText = "?";
      let count = 0;
      for(let key in query)
      {
         if(count > 0)
         {
            queryText += "&";
         }
         queryText += `${key}"="${query[key]}`;
         ++count;
      }

      return fetch(requestInfo + queryText);
   },

   post: function(requestInfo, body)
   {
      return fetch(requestInfo, {
         "method": "POST",
         "headers": {
            "Content-Type": "application/json"
         },
         "body": JSON.stringify(body)
      });
   }
};