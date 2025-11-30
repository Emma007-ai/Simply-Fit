const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  githubId: String,
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
