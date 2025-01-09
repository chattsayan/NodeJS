const mongoose = require("mongoose");

// ----- CREATING SCHEMA -----
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  age: { type: Number },
  gender: { type: String },
});

// ----- CREATING MODEL -----
module.exports = mongoose.model("User", userSchema);
