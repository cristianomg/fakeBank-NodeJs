const Sequelize = require("sequelize");
const dbConfig = require("../config/Database");

const User = require("../Models/User");
const Transaction = require("../Models/Transaction");

const connection = new Sequelize(dbConfig);

User.init(connection);

Transaction.init(connection);

User.associate(connection.models);
Transaction.associate(connection.models);

module.exports = connection;

//  yarn sequelize migration:create --name=create-users
