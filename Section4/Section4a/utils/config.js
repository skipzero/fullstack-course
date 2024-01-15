require('dotenv').config()

const PORT = process.env.PORT || 5150
const MONGODB_URI = `${process.env.MONGODB_URI}/blogs`

module.exports = {
  MONGODB_URI,
  PORT,
}
