const Transaction = require("../Models/Transaction");
const User = require("../Models/User");
const { Op } = require("sequelize");
class TransactionController {
  async index(req, res) {
    try {
      const { user_id } = req.params;
      const transactions = await Transaction.findAll({
        order: [["createdAt", "DESC"]],
        where: {
          userId: {
            [Op.eq]: user_id,
          },
        },
      });
      return res.json(transactions);
    } catch (Error) {
      console.log(Error);
      return res.status(500).json({ status: 500, message: Error });
    }
  }
  async deposit(req, res) {
    try {
      const { user_id } = req.params;
      const { value, account, password } = req.body;
      if (!user_id || !account || !password || !value) {
        console.log(user_id, account, password, value);
        return res
          .status(400)
          .json({ status: 400, message: "campos invalidos." });
      }
      const user = await User.findByPk(user_id);
      if (user.account !== Number(account)) {
        return res
          .status(400)
          .json({ status: 400, message: "Conta e/ou senha incorreta." });
      }
      const transaction = await Transaction.create({
        operation: "DEPOSIT",
        userId: user_id,
        value,
      });
      return res.json(transaction);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }
  async withdraw(req, res) {
    try {
      const { user_id } = req.params;
      const { value, account, password } = req.body;
      if (!user_id || !account || !password || !value) {
        console.log(user_id, account, password, value);
        return res
          .status(400)
          .json({ status: 400, message: "campos invalidos." });
      }
      const user = await User.findByPk(user_id);
      if (user.account !== Number(account)) {
        return res
          .status(400)
          .json({ status: 400, message: "Conta e/ou senha incorreta." });
      }
      const transaction = await Transaction.create({
        operation: "WITHDRAW",
        userId: user_id,
        value,
      });
      return res.json(transaction);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }
}

module.exports = new TransactionController();
