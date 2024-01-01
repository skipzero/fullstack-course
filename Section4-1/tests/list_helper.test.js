const listHelper = require('../utils/list_helper')

describe('Total likes in list',() => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]  
  test('sum of all likes', () => {
    const result = listHelper.sumLikes(listWithOneBlog)
    expect(result).toBe(5)    
  })
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})
 
