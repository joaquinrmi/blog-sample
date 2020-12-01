const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
   name:       String,
   title:      String,
   tags:       [ String ],
   content:    String,
   cover:      String,
   author:     mongoose.ObjectId
});

module.exports = mongoose.model("Article", articleSchema);