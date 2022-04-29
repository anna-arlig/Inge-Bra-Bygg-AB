const { Router } = require("express");
const user = new Router();

// Get My profile Info
user.get("/me");

// Get specific User Info
user.get("/find/:id");

//Create New User / Admin only
user.post("/create");

// Update profile / Admin only
user.patch("/update/:id");

// Delete User / Admin only
user.delete("/delete/:id");

module.exports = user;
