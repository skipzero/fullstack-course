const Blog = require('../models/blog')
const initialBlogs = [
  {
    author: 'Joe Strummer',
    likes: 100,
    title: 'drug prowling wolf',
    url: 'https://strummerville.com',
  },
  {
    author: 'Mick Jones',
    likes: 9,
    title: 'If youre in the crowd tonight...',
    url: 'https://badii.com',
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const getLastBlogId = async () => {
  const blogs = await Blog.find({})
  return blogs[blogs.length - 1].id
}

module.exports = {
  initialBlogs,
  nonExistingId, 
  blogsInDb,
  getLastBlogId
}