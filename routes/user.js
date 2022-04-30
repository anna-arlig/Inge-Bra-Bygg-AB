const { Router } = require("express");
const UserController = require("../controllers/UserController");
const user = new Router();
const Auth = require('../middlewares/auth')

// Get My profile Info
user.get("/me");

user.get("/all", UserController.all)

// Get specific User Info
user.get("/find/:id", Auth.admin);

//Create New User / Admin only
user.post("/create", Auth.admin);

// Update profile / Admin only
user.patch("/update/:id", Auth.admin);

// Delete User / Admin only
user.delete("/delete/:id", Auth.admin);

module.exports = user;
