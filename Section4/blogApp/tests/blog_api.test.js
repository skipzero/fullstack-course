const {dummy, sumLikes, mostBlogs, mostLikes, mostLiked} = require('../utils/list_helper')
const supertest = require('supertest')
const {lotsaBlogs} = require('./blog_posts_helper')
const Blog = require('../models/blog')
const {initialBlogs, blogsInDb, nonExistingId, getLastBlogId} = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared...')

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  console.log('Done...')
})

describe('Blogs list:',() => {
  describe('initial blogs entries saved', () => {
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
      expect(contents).toContain('Joe Strummer')
    })
    test('blog has property id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0]).toBeDefined()
    })
  })

  describe('blog has all properties', () => {
    
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
      expect(contents).toContain('Joe Public')
    })
  })

  test('a sum of many likes', async () => {
    const result = await sumLikes(lotsaBlogs)
    expect(result).toEqual(36) 
  })

  test('favourite blog', async () => {
    const result = await mostLiked(lotsaBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })

  test('author with most blogs', async () => {
    const results = await mostBlogs(lotsaBlogs)
    expect(results).toEqual({
      author: 'Robert C. Martin',
      likes: 3
    })
  })

  test('author with the most likes', async () => {
    const results = await mostLikes(lotsaBlogs)
    expect(results.author).toBe('Michael Chan')
  })

  describe('check for missing properties', () => {
    test('If blog has no title or url return 400', async () => {
      const blog = {
        author: 'James Joyce',
        title: 'A portrait of the author...',
        likes: 3
      }
      const result = await api.post('/api/blogs')
        .send(blog)
      expect(result.status).toBe(400)

    })

    test('if property like doesnt exist, likes === 0', async () => {
      const newBlog = {
        author: 'Roy Bacon',
        title: 'BSA singles and twins',
        url: 'britbike.com'
      }
      const response = await api.post('/api/blogs').send(newBlog)
      expect(response.body.likes).toBeDefined()
    })
  })

  describe('Able to delete & update blog entryies', () => {
    describe('able to delete entries', () => {
      test('delete', async () => {
        const blogsStart = await Blog.find({})
        const deleteId = blogsStart[0].id
        await api.delete(`/api/blogs/${deleteId}`).expect(204)
      })
    })
    describe('able to update blog', () => {
      test('updating', async () => {
        const blogsStart = await Blog.find({})
        const blogToUpdate = blogsStart[0]
        const updatedBlog = {
          likes: 99
        }
        await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)
        const testing = await Blog.find({})
      })
    })
  })
}) 
  

// Dummy Test, sanity check...
describe('dummy tests', () => { 
  test('dummy returns one', () => {
    const blogString = []
    const result = dummy(blogString)
    expect(result).toBe(1)
  })
})