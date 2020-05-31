const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        cpfCnpj: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        cpfCnpjFormatado: {
          type: DataTypes.VIRTUAL,
          validate: {
            notEmpty: true,
          },
        },
        account: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
          },
        },
        password: {
          type: DataTypes.VIRTUAL,
          allowNull: false,
          validate: {
            len: [6, 16],
          },
        },
        passwordHash: DataTypes.STRING,
        flActive: {
          type: DataTypes.STRING,
          defaultValue: true,
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        sequelize,
        tableName: "users",
        hooks: {
          beforeSave: async (user) => {
            if (user.password) {
              user.passwordHash = await bcrypt.hash(user.password, 8);
            }
            if (user.cpfCnpjFormatado) {
              user.cpfCnpj = removerFormatacaoCpfCnpj(user.cpfCnpjFormatado);
            }
          },
        },
      }
    );
  }
  async checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  }
}

function removerFormatacaoCpfCnpj(cpfCnpj) {
  var result = "";
  const caractersToRemove = [".", "-", "/"];
  Array.from(cpfCnpj).forEach((x) => {
    if (!caractersToRemove.includes(x)) {
      result += x;
    }
  });
  return result;
}

module.exports = User;
