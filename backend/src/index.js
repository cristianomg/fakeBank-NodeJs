const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const timeOut = require("connect-timeout");

class App {
  app = express();
  constructor() {
    this.middleware();
    this.routes();
  }
  middleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;
