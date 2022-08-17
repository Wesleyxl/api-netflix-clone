const bcrypt = require("bcrypt");
const createUserToken = require("../helper/createUserToken");
const User = require("../model/User");

module.exports = {
  // login
  async login(req, res) {
    const { email, password } = req.body;

    // validating fields
    if (!email || email === "") {
      return res.status(400).json({ error: "O campo email é obrigatório" });
    }
    if (!password || password === "") {
      return res.status(400).json({ error: "O campo senha é obrigatório" });
    }

    // check if user exists
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "name", "email", "image", "password"],
    });

    // return user error
    if (!user) {
      return res.status(400).json({ error: "Este email não foi encontrado" });
    }

    // validating password
    const validatedPass = await bcrypt.compare(password, user.password);

    if (!validatedPass) {
      return res.status(400).json({ error: "A senha está incorreta" });
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.name,
        image: user.image,
      },
      access_token: createUserToken(user.id),
    });
  },

  // registry new user
  async register(req, res) {
    const { name, email, password } = req.body;

    // validating fields
    if (!name || name === "") {
      return res.status(400).json({ error: "O campo nome é obrigatório" });
    }
    if (!email || email === "") {
      return res.status(400).json({ error: "O campo email é obrigatório" });
    }
    if (!password || password === "") {
      return res.status(400).json({ error: "O campo senha é obrigatório" });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    const existsUser = await User.findOne({
      where: { email },
      attributes: ["id"],
    });

    if (existsUser) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const user = await User.create({
      name,
      email,
      image: null,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({ error: "Usuário não foi registrado" });
    }

    return res.json({
      user,
      access_token: createUserToken(user.id),
    });
  },
};
