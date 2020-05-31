const { Router } = require("express");

const routes = Router();

const UserController = require("./Controllers/UserController");
const TransactionController = require("./Controllers/TransactionController");

routes.get("/", (req, res) => {
  return res.json("hello world");
});

routes.get("/users", UserController.index);

routes.post("/users", UserController.create);

routes.post("/users/:user_id/deposit", TransactionController.deposit);
routes.post("/users/:user_id/withdraw", TransactionController.withdraw);

module.exports = routes;
