const User = require("../models/User.model");
const Blog = require("../models/Blog.model");

exports.getBlogs = async (req, res) => {
  let userId = req.userId;
  let { title, category, sort, order } = req.query;

  console.log(userId, title, category, sort, order);
  try {
    let user = await User.findOne({ _id: userId });

    if (user) {
      // console.log(user);
      let config = { username: user.username };
      if (title) config.title = title;
      if (category) config.category = category;
      console.log(config);
      let blogs;
      if (sort && (order == "asc" || order == "desc")) {
        blogs = await Blog.find(config).sort({ date: order == "asc" ? 1 : -1 });
      } else {
        blogs = await Blog.find(config);
      }
      console.log(blogs);
      if (blogs.length > 0) {
        return res.status(200).json({ message: "Blogs found!", blogs: blogs });
      } else {
        return res
          .status(404)
          .json({ message: "No Blogs found for you!", blogs: [] });
      }
    }
  } catch (e) {
    return res.status(500).json({ message: "Could not get blogs" });
  }
};

exports.addBlog = async (req, res) => {
  let userId = req.userId;
  // console.log(userId, req.body);
  try {
    let user = await User.findOne({ _id: userId });
    let data = {
      ...req.body,
      username: user.username,
      comments: [],
      likes: 0,
      date: new Date().toISOString(),
    };
    let newBlog = new Blog(data);
    await newBlog.save();
    console.log(newBlog);
    return res
      .status(201)
      .json({ message: "New Blog created!", blog: newBlog });
  } catch (err) {
    return res.status(500).json({ message: "someting wen wrong", err: err });
  }
};

exports.updateBlog = async (req, res) => {
  let userId = req.userId;
  // console.log(userId, req.body);
  let { id } = req.params;
  // console.log(id, req.body);
  try {
    let user = await User.findOne({ _id: userId });
    let blog = await Blog.findOne({ _id: id });
    if (user.username != blog.username) {
      //to check whehter user is updaing his blog only,
      return res
        .status(400)
        .json({ message: "Not authorized to change this blog" });
    }
    let newBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(201)
      .json({ message: "Blog updated Successfully", blog: newBlog });
  } catch (err) {
    return res.status(500).json({ message: "someting wen wrong", err: err });
  }
};

exports.deleteBlog = async (req, res) => {
  let userId = req.userId;
  // console.log(userId, req.body);
  let { id } = req.params;
  // console.log(id, req.body);
  try {
    let user = await User.findOne({ _id: userId });
    let blog = await Blog.findOne({ _id: id });
    if (user.username != blog.username) {
      //to check whehter user is deleting his blog only,
      return res
        .status(400)
        .json({ message: "Not authorized to delete this blog" });
    }
    let newBlog = await Blog.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Blog Deleted Successfully", blog: newBlog });
  } catch (err) {
    return res.status(500).json({ message: "someting wen wrong", err: err });
  }
};

exports.likeBlog = async (req, res) => {
  let { id } = req.params;
  // console.log(id, req.body);
  console.log(id);
  try {
    let blog = await Blog.findOne({ _id: id });
    let newBlog = await Blog.findByIdAndUpdate(
      id,
      { likes: blog.likes + 1 },
      { new: true }
    );
    console.log(id, blog, "like");
    return res
      .status(201)
      .json({ message: "Blog Liked Successfully", blog: newBlog });
  } catch (err) {
    return res.status(500).json({ message: "someting went wrong", err: err });
  }
};
exports.commentBlog = async (req, res) => {
  let userId = req.userId;
  // console.log(userId, req.body);
  let { id } = req.params;
  // console.log(id);
  try {
    let user = await User.findOne({ _id: userId });
    let blog = await Blog.findOne({ _id: id });
    // console.log(user,blog);
    let comments = [
      ...blog.comments,
      { username: user.username, content: req.body.content },
    ];
    let newBlog = await Blog.findByIdAndUpdate(id, { comments }, { new: true });
    return res
      .status(201)
      .json({ message: "Comment added to Blog Successfully", blog: newBlog });
  } catch (err) {
    return res.status(500).json({ message: "someting went wrong", err: err });
  }
};
