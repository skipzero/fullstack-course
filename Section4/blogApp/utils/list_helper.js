const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
}

const sumLikes = (blogs) => {
  return blogs.reduce((acc, post) => {
    return acc += post.likes
  }, 0);
}

const mostLiked = blogs => {
  blogs.sort((a, b) => {
    a = a.likes
    b = b.likes
    return a < b ? 1 : a > b ? -1 : 0
  })
  
  return {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes
  }
}

const mostBlogs = blogs => {
  const topAuthor = _.countBy(blogs, 'author')
  const tops = Object.keys(topAuthor).reduce((a,b) => {
    return topAuthor[a] > topAuthor[b] ? a : b;
  }, {})

  return {
    author: tops,
    likes: topAuthor[tops]
  }
}

const mostLikes = blogs => {
  const liking = blogs.reduce((acc, blog) => {
    const {author, likes} = blog;
    return {...acc, [author]: likes}
  }, {})
  const ret = Object.keys(liking).reduce((a,b) => {
    return liking[a] > liking[b] ? a : b
  }, {})
  return {
    author: ret,
    likes: liking[ret]
  }
}

module.exports = {
  dummy,
  sumLikes,
  mostLiked,
  mostBlogs,
  mostLikes
}