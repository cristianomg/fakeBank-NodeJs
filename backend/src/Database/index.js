const Sequelize = require("sequelize");
const dbConfig = require("../config/Database");

const User = require("../Models/User");

const connection = new Sequelize(dbConfig);

User.init(connection);

module.exports = connection;


//  yarn sequelize migration:create --name=create-users