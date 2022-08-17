const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const connection = new Sequelize(dbConfig);

// includes models
const User = require("../app/model/User");
const Category = require("../app/model/Category");
const Movie = require("../app/model/Movie");

// init models
User.init(connection);
Category.init(connection);
Movie.init(connection);

// models associations
Category.associate(connection.models);
Movie.associate(connection.models);

module.exports = connection;
