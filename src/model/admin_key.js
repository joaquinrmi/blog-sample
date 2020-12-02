const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminKey = new Schema({
   _id:  String,
   type: String
});

module.exports = mongoose.model("AdminKey", adminKey);