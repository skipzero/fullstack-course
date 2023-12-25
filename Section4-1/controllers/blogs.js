const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res) => {
  console.log("/ get --req", req.body);
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogsRouter.get("/:id", (req, res, next) => {
  console.log("IDget", req.params);
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

blogsRouter.post("/", (req, res, next) => {
  console.log("/ post", req);
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .then(next());
});

module.exports = blogsRouter;
