const info = (...args) => {
  if (process.env.NODE_ENV !== 'test') {
    console.info(...args)
  }
}

const error = (...args) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...args)
  }
}

module.exports = {
  info,
  error,
}
