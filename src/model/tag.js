const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
   value:      String,
   articles:   [ mongoose.ObjectId ]
});

module.exports = mongoose.model("Tag", tagSchema);