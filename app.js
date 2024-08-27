global.absolutePath = (p) => {
  return path.join(__dirname, p);
};
global.include = (localModule) => {
  return require(global.absolutePath(localModule));
};

const dotenv = require("dotenv");
dotenv.config({ silent: true });

const log = console;
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require("mongoose");
const controllers = include("modules");
const logger = include("middlewares/logger"); // Import the custom logger

const config = include("common/config/");



const app = express();

const initQueue = require("./workers");

app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(logger);


// mongoose.set("useCreateIndex", true);
// console.log(config.server.db);
mongoose.connect(config.server.db);

mongoose.connection.once("open", () => {
  log.info("Database connected");
  app.emit("ready");
});

initQueue(app);


controllers(app);
app.emit("ready");

module.exports = app;
