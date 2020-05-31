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

  async show (req, res){
    const {user_id} = req.params;

    const user = User.findByPk({
      include: {
        association: 'transactions'
      },
    })
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
}

module.exports = new UserController();
