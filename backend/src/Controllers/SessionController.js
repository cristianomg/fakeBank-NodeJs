const User = require("../Models/User");
const { Op } = require("sequelize");
class SessionController {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
      include: {
        association: "transactions",
      },
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    if (await user.checkPassword(password)) {
      return res.json(user);
    }
    return res.status(400).json({ error: "Email or password incorrect." });
  }
}

module.exports = new SessionController();
