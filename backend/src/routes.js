const { Router } = require("express");

const routes = Router();

const UserController = require("./Controllers/UserController");

routes.get("/", (req, res) => {
  return res.json("hello world");
});

routes.get("/users", UserController.index);

routes.post("/users", UserController.create);

module.exports = routes;
