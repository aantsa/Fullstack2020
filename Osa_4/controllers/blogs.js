const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end();
  }
});

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const token = req.token;
  
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: req.user._id,
  }).populate("user", { username: 1, name: 1});

  const newBlog = await blog.save();
  req.user.blogs = req.user.blogs.concat(newBlog._id); // SPREAD OPERATOR TÄHÄN
  await req.user.save();
  res.status(201).json(newBlog.toJSON());
});

blogsRouter.delete("/:id", async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (blog.user.toString() === req.user.id.toString()) {
    await Blog.deleteOne({ _id: id });
    res.sendStatus(204).end();
  } else {
    res.status(401).json({ error: "unauthorized operation" });
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("user", { username: 1, name: 1 });

  updatedBlog
    ? res.status(200).json(updatedBlog.toJSON())
    : res.status(404).end();

  req.body ? res.status(200).json(req.body.toJSON()) : res.status(400).end();
});

module.exports = blogsRouter;
