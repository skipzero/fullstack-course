const dummy = (blogs) => {
  return 1;
}

const sumLikes = (blogs) => {
  return blogs.reduce((acc, post) => {
    return acc += post.likes
  }, 0);
}

module.exports = {
  dummy,
  sumLikes,
}