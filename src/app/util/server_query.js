export default {
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