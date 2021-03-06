const User = require("../Models/User");
const { Op } = require("sequelize");
class SessionController {
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Erro: requisição invalida." });
    }
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

    if (!user){
      return res.status(400).json({message: "Email or password incorrect."})
    }

    if (await user.checkPassword(password)) {
      return res.json(user);
    }
    return res.status(400).json({ error: "Email or password incorrect." });
  }
}

module.exports = new SessionController();
