const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res) => {
  console.log("/ get --req", req.body);
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogsRouter.get("/:id", (req, res, next) => {
  console.log("IDget", req.body);
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

blogsRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);
  console.log("BLOG!!!", blog);
  blog.save().then((result) => {
    res.status(201).json(result);
    console.log(res);
  });
});

// blogsRouter.post("/", async (req, res) => {
//   console.log("/ post", req.body);
//   const blog = new Blog({
//     body: req.body,
//   });

//   try {
//     const dataToSave = await blog.save();
//     res.status(200).json(dataToSave);
//   } catch (err) {
//     res.status(400).json(`Error: ${err.message}`);
//   }
// blog
//   .save()
//   .then((result) => {
//     res.status(201).json(result);
//   })
//   .then(next())
//   .catch((err) => console.log("Error:", err));

module.exports = blogsRouter;
