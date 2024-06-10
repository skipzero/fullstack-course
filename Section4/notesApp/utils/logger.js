const info = (...args) => {
  if (process.env.NODE_ENV !== 'test') {
    console.info(...args)
  }
}

const error = (...args) => {
  console.log('error Logger', process.env.NODE_ENV)
  if (process.env.NODE_ENV !== 'test') {
    console.error(...args)
  }
}

module.exports = {
  info,
  error,
}
