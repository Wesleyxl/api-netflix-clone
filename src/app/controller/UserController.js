const User = require("../model/User");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    if (users.length < 1) {
      return res.status(400).json({ message: "users not found" });
    }

    return res.json(users);
  },
};
