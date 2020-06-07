module.exports = {
  TransactionException: function (message) {
    (this.message = message), (this.name = "Transaction Exception");
  },
};
