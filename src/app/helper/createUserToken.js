const jwt = require("jsonwebtoken");

const createUserToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.JET_EXPIRE_IN,
  });

module.exports = createUserToken;
