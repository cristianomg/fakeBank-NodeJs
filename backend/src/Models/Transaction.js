const { Model, DataTypes } = require("sequelize");
const User = require("./User");
const { TransactionException } = require("../Exceptions/Exceptions");
class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        operation: {
          type: DataTypes.ENUM,
          values: ["TRANSFER", "DEPOSIT", "WITHDRAW"],
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: {
              tableName: "users",
            },
            key: "id",
          },
          allowNull: false,
        },
        value: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          defaultValue: 0.0,
          validate: {
            min: { args: 0.1, msg: "Invalid value." },
          },
        },
      },
      {
        sequelize,
        tableName: "transactions",
        hooks: {
          beforeCreate: async (transaction) => {
            if (transaction.value) {
              const user = await User.findByPk(transaction.userId);
              if (!user) {
                throw new TransactionException("User not found.");
              }
              if (transaction.operation === "DEPOSIT") {
                user.balance = parseFloat(user.balance) + transaction.value;
              } else if (transaction.operation === "WITHDRAW") {
                console.log(user.balance);
                console.log(transaction.value);
                if (parseFloat(user.balance) >= transaction.value) {
                  user.balance = parseFloat(user.balance) - transaction.value;
                } else {
                  throw new TransactionException(
                    "Insufficient funds in the account."
                  );
                }
              }
              user.save();
            }
          },
        },
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  }
}

module.exports = Transaction;
