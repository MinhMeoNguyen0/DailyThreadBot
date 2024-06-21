global.absolutePath = (p) => {
  return path.join(__dirname, p);
};
global.include = (localModule) => {
  return require(global.absolutePath(localModule));
};
const dotenv = require("dotenv");
dotenv.config({ silent: true });
const express = require("express");
const path = require("path");
// const mongoose = require("mongoose");
const controllers = include("modules");
const app = express();
// const initQueue = require("./workers");

app.set("views", path.join(__dirname, "views"));

app.use(express.json());
// mongoose.set("useCreateIndex", true);
// mongoose.connect(config.db, { useNewUrlParser: true });

// mongoose.connection.once("open", () => {
//   log.info("Database connected");
//   app.emit("ready");
// });

controllers(app);
app.emit("ready");

module.exports = app;
