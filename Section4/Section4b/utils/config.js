require('dotenv').config()

const PORT = process.env.PORT || 5150
const MONGODB_URI = process.env.NODE_ENV === 'ci' 
  ? process.env.CI_MONGODB_URI
  : process.env.MONGODB_URI


module.exports = {
  MONGODB_URI,
  PORT,
}
