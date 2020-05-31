const Transaction = require("../Models/Transaction");
const User = require("../Models/User");
class TransactionController {
  async deposit(req, res) {
    try {
      const { user_id } = req.params;

      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(400).json({ error: "User not found." });
      }
      const { value } = req.body;
      const transaction = await Transaction.create({
        operation: "DEPOSIT",
        userId: user_id,
        value,
      });
      return res.json(transaction);
    } catch (Error) {
      return res.status(500).json({ error: Error.message });
    }
  }
  async withdraw(req, res) {
    try {
      const { user_id } = req.params;
      const { value } = req.body;
      const transaction = await Transaction.create({
        operation: "WITHDRAW",
        userId: user_id,
        value,
      });
      return res.json(transaction);
    } catch (Error) {
      return res.status(500).json({ error: Error.message });
    }
  }
}

module.exports = new TransactionController();
