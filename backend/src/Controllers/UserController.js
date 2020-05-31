const User = require("../Models/User");
const { Op } = require("sequelize");

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      include: {
        association: "transactions",
      },
    });
    return res.json(users);
  }

  async show(req, res) {
    const { user_id } = req.params;

    const user = User.findByPk({
      include: {
        association: "transactions",
      },
    });
  }

  async create(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        cpfCnpj,
        account,
        password,
      } = req.body;
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        cpfCnpjFormatado: cpfCnpj,
        account: account,
        password: password,
        flActive: true,
      });
      return res.json(user);
    } catch (Error) {
      if (Error.errors.length > 0) {
        var result = Error.errors.map((x) => x.message).join(",");
        return res.status(500).json("Error: " + result);
      }
      return res.status(500).json(Error.message);
    }
  }
}

module.exports = new UserController();
