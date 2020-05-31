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

  async create(req, res) {
    try {
      const newUser = req.body;
      const user = await User.create(newUser);
      return res.json(user);
    } catch (Error) {
      return res.status(500).json(Error.message);
    }
  }
  async verificarUser(req, res) {
    const session = req.body;
    console.log(session);
    const user = await User.findAll({
      where: {
        account: {
          [Op.eq]: session.account,
        },
      },
    });
  }
}

module.exports = new UserController();
