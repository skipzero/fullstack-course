const config = require("config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controller/blogs");
const middleware = require("./utils/middleware");
const { info } = require("./utils/logger");
mongoose.set("strictQuery", false);

app.use("/api/blogs", blogsRouter);

info(`connecting to ${config.MONGODB_URL}...`);
