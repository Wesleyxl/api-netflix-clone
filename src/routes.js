const express = require("express");

// middleware
const auth = require("./app/middleware/auth");

// controllers
const UserController = require("./app/controller/UserController");
const AuthController = require("./app/controller/AuthController");
const CategoryController = require("./app/controller/CategoryController");
const MovieController = require("./app/controller/MovieController");

const router = express.Router();

router.get("/status", (req, res) => {
  res.json("ok");
});

// auth routes
router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

// category routes
router.get("/categories", auth, CategoryController.index);
router.get("/category/:category_id", auth, CategoryController.show);
router.post("/category", auth, CategoryController.store);
router.put("/category/:category_id", auth, CategoryController.update);
router.delete("/category/:category_id", auth, CategoryController.delete);

// movies routes
router.get("/movies", auth, MovieController.index);
router.get("/movies/banner", MovieController.banner);
router.get("/movie/:movie_id", auth, MovieController.show);
router.post("/movie", auth, MovieController.store);
router.put("/movie/:movie_id", auth, MovieController.update);
router.delete("/movie/:movie_id", auth, MovieController.delete);

// users routes
router.get("/users", auth, UserController.index);

module.exports = router;
