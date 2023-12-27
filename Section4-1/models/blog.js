const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    author: String,
    body: String,
    url: String,
    likes: Number,
  },
  { collection: "entries" }
);

module.exports = mongoose.model("Blog", blogSchema);
