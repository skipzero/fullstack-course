const {dummy, sumLikes, mostBlogs, mostLikes, mostLiked} = require('../utils/list_helper')
const supertest = require('supertest')
const {lotsaBlogs} = require('./blog_posts_helper')
const Blog = require('../models/blog')
const {initialBlogs, blogsInDb, nonExistingId} = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared...')

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  // helper.initialNotes.forEach(async (note) => {
  //   let noteObject = new Note(note)
  //   await noteObject.save()
  //   console.log('saved...')
  // })
  console.log('Done...')
})

describe('Blogs list:',() => {

  test('blogs are returned as json', async () => {
  
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs/')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.author)
    console.log('contents', contents)
  expect(contents).toContain(
    'Joe Strummer'
  )
})

test('blog has property id', async () => {
  const response = await api.get('/api/blogs')
    console.log('!!!!!!!!!!!!!!+++++++++++++', response.body)
  expect(response.body[0]).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    author: 'Joe Public',
    likes: 12,
    title: 'The future is unwritten...',
    url: 'https://zerosquadron.coml'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.author)
  expect(contents).toContain(
    'Joe Public'
  )
})

  test('a sum of many likes', () => {
    const result = sumLikes(lotsaBlogs)
    expect(result).toEqual(36) 
  })

  test('favourite blog', () => {
    const result = mostLiked(lotsaBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })

  test('author with most blogs', () => {
    const results = mostBlogs(lotsaBlogs)
    expect(results).toEqual({
      author: 'Robert C. Martin',
      likes: 3
    })
  })
})

test('author with the most likes', () => {
  const results = mostLikes(lotsaBlogs)
  console.log(results)
})

describe('dummy tests', () => { 
  test('dummy returns one', () => {
    const blogString = []
    const result = dummy(blogString)
    expect(result).toBe(1)
  })
})
 
