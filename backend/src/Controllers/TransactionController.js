const Transaction = require("../Models/Transaction");
class TransactionController {
  async deposit(req, res) {
    try {
      const { user_id } = req.params;
      const { value } = req.body;
      const transaction = await Transaction.create({
        operation: "DEPOSIT",
        userId: user_id,
        value,
      });
      return res.json(transaction);
    } catch (Error) {
      if (Error.errors.length > 0) {
        var result = Error.errors.map((x) => x.message).join(",");
        return res.status(500).json("Error: " + result);
      }
      return res.status(500).json(Error.message);
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
      if (Error.errors.length > 0) {
        var result = Error.errors.map((x) => x.message).join(",");
        return res.status(500).json("Error: " + result);
      }
      return res.status(500).json(Error.message);
    }
  }
}

module.exports = new TransactionController();
