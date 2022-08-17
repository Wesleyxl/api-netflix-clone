const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const connection = new Sequelize(dbConfig);

// includes models
const User = require("../app/model/User");

// init models
User.init(connection);

module.exports = connection;
