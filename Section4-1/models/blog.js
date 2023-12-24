const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  id: String,
  author: String,
  body: String,
  url: String,
  likes: Number,
});

module.exports = mongoose.model("Blog", blogSchema);
