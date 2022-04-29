const { Router } = require("express");
const tasks = new Router();

// Admin
// Get All Tasks
tasks.get("/all", getAllTasks);
// Get Specific Task
tasks.get("/:id");
// Delete Task
tasks.delete("/delete/:id");

// Worker
// Get worker Tasks
tasks.get("/worker/:id");
// Create new Task
tasks.post("/create");
tasks.post("/create/:id/img");
// Update Tasks
tasks.patch("/update/:id");
// Send Message / Worker, Client
tasks.post("/:id/messages");
// Get Specific Task Messages / Worker, Client
tasks.get("/:id/messages");

// Client
// Get Client Tasks / Client, Admin
tasks.get("/client/:id");

module.exports = tasks;
