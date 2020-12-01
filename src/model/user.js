const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
   username:   String,
   email:      String,
   password:   String,
   articles:   [ mongoose.ObjectId ]
});

module.exports = mongoose.model("User", userSchema);