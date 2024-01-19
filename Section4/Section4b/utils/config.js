require('dotenv').config()

const PORT = process.env.PORT || 5150
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? `${process.env.MONGODB_URI}/testNoteApp`
  : `${process.env.MONGODB_URI}/noteApp`
 console.log('CONFIG', process.env.MONGODB_URI)
module.exports = {
  MONGODB_URI,
  PORT,
}
