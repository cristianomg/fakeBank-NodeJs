const { Router } = require("express");

const routes = Router();

const UserController = require("./Controllers/UserController");
const TransactionController = require("./Controllers/TransactionController");
const DocumentationController = require("./Controllers/DocumentationController");

routes.get("/", (req, res) => {
  return res.json(DocumentationController.endpoints);
});

routes.get("/users", UserController.index);

routes.post("/users", UserController.create);

routes.post("/users/:user_id/deposit", TransactionController.deposit);
routes.post("/users/:user_id/withdraw", TransactionController.withdraw);

module.exports = routes;
