const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)
  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.url || !blog.title) {
    res.status(400).end()
  } else {
    blog.save().then((result) => {
      res.status(201).json(result).end()
    })
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res, next) => {
  const {likes} = req.body

  const result = await Blog.findByIdAndUpdate(req.params.id, {likes}, {new: true})
    if (result) {
      res.status(200).json({likes})
    } else {
      res.status(404).end()
    }
})

// blogsRouter.post('/', async (req, res) => {
//   console.log('/ post', req.body)
//   const blog = new Blog({
//     body: req.body,
//   })

//   try {
//     const dataToSave = await blog.save()
//     res.status(200).json(dataToSave)
//   } catch (err) {
//     res.status(400).json(`Error: ${err.message}`)
//   }
// blog
//   .save()
//   .then((result) => {
//     res.status(201).json(result)
//   })
//   .then(next())
//   .catch((err) => console.log('Error:', err))

module.exports = blogsRouter
