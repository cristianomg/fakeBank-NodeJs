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
    const user = await User.findByPk(user_id, {
      include: {
        association: "transactions",
      },
    });
    if (user) {
      return res.json(user);
    }
    return res.status(400).json({ status: 400, message: "User not Found" });
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
        return res.status(400).json({ status: 400, message: result });
      }
      return res.status(400).json({ message: Error.message });
    }
  }
}

module.exports = new UserController();
