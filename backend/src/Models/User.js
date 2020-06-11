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
          unique: {
            args: true,
            msg: "O email já foi utilizado, utilize outro email.",
          },
          validate: {
            isEmail: true,
          },
        },
        cpfCnpj: {
          type: DataTypes.STRING,
          unique: {
            args: true,
            msg: "O cpf ou cnpj já foi utilizado, utilize outro.",
          },
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
          unique: {
            args: true,
            msg: "A conta já foi utilizado, utilize outra.",
          },
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
        city: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            notNull: true,
          },
        },
        uf: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: true,
            notNull: true,
            len: 2,
          },
        },
        number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        neighborhood: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            notNull: true,
          },
        },
        balance: {
          type: DataTypes.DECIMAL,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: "users",
        hooks: {
          beforeValidate: async (user) => {
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
  static associate(models) {
    this.hasMany(models.Transaction, {
      foreignKey: "userId",
      as: "transactions",
    });
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
