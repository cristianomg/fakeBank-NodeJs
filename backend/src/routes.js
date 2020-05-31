const { Router } = require("express");

const routes = Router();

const UserController = require("./Controllers/UserController");
const TransactionController = require("./Controllers/TransactionController");
const DocumentationController = require("./Controllers/DocumentationController");
const SessionController = require("./Controllers/SessionController");

routes.get("/", (req, res) => {
  return res.json(DocumentationController.endpoints);
});

routes.post("/session/login", SessionController.login);

routes.get("/users", UserController.index);
routes.get("/users/:user_id", UserController.show);

routes.post("/users", UserController.create);

routes.post("/users/:user_id/deposit", TransactionController.deposit);
routes.post("/users/:user_id/withdraw", TransactionController.withdraw);

module.exports = routes;
