const {dummy, sumLikes, mostBlogs, mostLikes, mostLiked} = require('../utils/list_helper')
const {lotsaBlogs} = require('./blog_posts_helper')

describe('Blogs list:',() => {

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
 
