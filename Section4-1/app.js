const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const { requestLogger } = require("./utils/middleware");
const { info, error } = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

info(`Connecting to ${config.MONGODB_URI}...`);

app.use("/api/blogs", blogsRouter);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info(`Connected to Mongoose...`);
  })
  .catch(() => error(`Couldn't connect to Mongoose...`));

app.use(cors);
app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger);

app.use("api/blogs", blogsRouter);

module.exports = app;
