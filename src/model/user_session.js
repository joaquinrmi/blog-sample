const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSessionSchema = new Schema({
   _id:  mongoose.ObjectId,
   keys: [ String ]
});

module.exports = mongoose.model("UserSession", userSessionSchema);