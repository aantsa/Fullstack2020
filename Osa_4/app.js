const config = require("./utils/config");
const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const router = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("trying to connect to the database...");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("database connection established");
  })
  .catch((error) => {
    logger.error("error occured while trying to create a database connection: " + error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.reqLogger);

app.use("/api/blogs", router);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;