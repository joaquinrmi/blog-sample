const mongoose = require("mongoose");
const { Schema } = mongoose;

const articlePopularitySchema = new Schema({
   _id:     mongoose.ObjectId,
   visits:  Number
});

module.exports = mongoose.model("ArticlePopularity", articlePopularitySchema);