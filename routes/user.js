const { Router } = require("express");
const UserController = require("../controllers/UserController");
const user = new Router();
const Auth = require("../middlewares/auth");

//Get token
user.post("/auth", UserController.auth);

// Get My profile Info
user.get("/me", Auth.verifyToken, UserController.me);

// Get all users
user.get("/all", Auth.verifyToken, Auth.admin, UserController.all);

// Get specific User Info
user.get("/find/:id", Auth.verifyToken, Auth.admin, UserController.getById);

//Create New User / Admin only
user.post("/create", Auth.verifyToken, Auth.admin, UserController.createUser);

// Update profile / Admin only
user.patch("/update/:id", Auth.verifyToken, UserController.update);

// Delete User / Admin only
user.delete("/delete/:id", Auth.verifyToken, Auth.admin, UserController.delete);

//Logout
user.get("/logout", UserController.logout)

module.exports = user;
