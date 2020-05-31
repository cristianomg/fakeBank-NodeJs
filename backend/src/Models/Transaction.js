const { Model, DataTypes } = require("sequelize");
const User = require("./User");
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
                throw new Error("User not found.");
              }
              if (transaction.operation === "DEPOSIT") {
                console.log(transaction.balance);
                user.balance = parseFloat(user.balance) + transaction.value;
              } else if (transaction.operation === "WITHDRAW") {
                console.log(user.balance, transaction.value);
                if (parseFloat(user.balance) >= transaction.value) {
                  user.balance = parseFloat(user.balance) - transaction.value;
                } else {
                  throw new Error("Insufficient funds in the account.");
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
