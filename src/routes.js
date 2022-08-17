const express = require("express");

// middleware
const auth = require("./app/middleware/auth");

// controllers
const UserController = require("./app/controller/UserController");
const AuthController = require("./app/controller/AuthController");

const router = express.Router();

router.get("/status", (req, res) => {
  res.json("ok");
});

// auth routes
router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

// users routes
router.get("/users", auth, UserController.index);

module.exports = router;
