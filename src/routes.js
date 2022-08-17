const express = require("express");

// middleware
const auth = require("./app/middleware/auth");

// controllers
const UserController = require("./app/controller/UserController");

const router = express.Router();

router.get("/status", (req, res) => {
  res.json("ok");
});

// users routes
router.get("/users", auth, UserController.index);

module.exports = router;
