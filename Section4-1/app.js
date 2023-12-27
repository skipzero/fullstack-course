const { MONGODB_URI } = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const { requestLogger } = require("./utils/middleware");
const { info, error } = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

info(`Connecting to ${MONGODB_URI}...`);

app.use("/api/blogs", blogsRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info(`Connected to Mongoose...`);
  })
  .catch((err) => error(`Couldn't connect to Mongoose...\n${err}`));

app.use(cors);
app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger);

module.exports = app;
