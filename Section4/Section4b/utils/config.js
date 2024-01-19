require('dotenv').config()

const PORT = process.env.PORT || 5150

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
} else {
  MONGODB_URI = process.env.MONGODB_URI
}


module.exports = {
  MONGODB_URI,
  PORT,
}
