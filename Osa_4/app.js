const config = require("./utils/config");
const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

logger.info("trying to connect to the database...");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("database connection established");
  })
  .catch((error) => {
    logger.error(
      "error occured while trying to create a database connection: " +
        error.message
    );
  });

app.use(cors());
app.use(express.json());
app.use(middleware.reqLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogsRouter );
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
