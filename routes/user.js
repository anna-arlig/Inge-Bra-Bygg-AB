const { Router } = require("express");
const UserController = require("../controllers/UserController");
const user = new Router();
const Auth = require("../middlewares/auth");

//Get token
user.post("/auth", UserController.auth);

// Get My profile Info
user.get("/me", Auth.loggedin, UserController.me);

// Get all users
user.get("/all", Auth.adminWorker, UserController.all);

// Get specific User Info
user.get("/find/:id", Auth.admin, UserController.getById);

//Create New User / Admin only
user.post("/create", Auth.admin, UserController.createUser);

// Update profile / Admin only
user.patch("/update/:id", Auth.loggedin, UserController.update);

// Delete User / Admin only
user.delete("/delete/:id", Auth.admin, UserController.delete);

module.exports = user;
