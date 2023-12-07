const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  username: String,
  title: String,
  content: String,
  category: String,
  date: String,
  likes: Number,
  comments: [
    {
      username: String,
      content: String,
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
