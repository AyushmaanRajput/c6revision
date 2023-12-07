const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blog.controller");
const auth = require("../middlewares/auth.middleware");

router.use(auth);

router.get("/blogs", blogController.getBlogs);

router.post("/blogs", blogController.addBlog);

router.patch("/blogs/:id", blogController.updateBlog);

router.delete("/blogs/:id", blogController.deleteBlog);

router.patch("/blogs/:id/like", blogController.likeBlog);

router.patch("/blogs/:id/comment", blogController.commentBlog);

module.exports = router;
