const { info, error } = require("./config");

const requestLogger = (req = { path, method, path, body }, res, next) => {
  info(`Method: ${req.method}`);
  info(`Path: ${req.path}`);
  info(`Body: ${req.body}`);
  info(`Info: -------------`);
  next();
};

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _req, res, next) => {
  error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed ID" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json(error.message);
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
