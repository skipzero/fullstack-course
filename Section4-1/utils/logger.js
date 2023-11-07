const info = (...args) => {
  console.info(...args);
};

const error = (...args) => {
  console.error(...args);
};

module.exports = {
  info,
  error,
};
