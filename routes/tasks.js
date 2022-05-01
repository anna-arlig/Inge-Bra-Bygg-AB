const { Router } = require("express");
const tasks = new Router();
const Auth = require('../middlewares/auth')
const TaskController = require('../controllers/TaskController')

// Admin
// Get All Tasks
tasks.get("/all", TaskController.all);
// Get Specific Task
tasks.get("/:id", Auth.admin);
// Delete Task
tasks.delete("/delete/:id", Auth.admin);

// Worker
// Create new Task
tasks.post("/create", Auth.worker);
// Update Tasks
tasks.patch("/update/:id", Auth.worker);
// Send Message / Worker, Client
tasks.post("/:id/messages", Auth.workerClient);
// Get Specific Task Messages / Worker, Client
tasks.get("/:id/messages", Auth.workerClient);

// Client
// Get Client Tasks / Admin
tasks.get("/client/:id", Auth.admin);

//All
tasks.get("/allmytasks")

module.exports = tasks;


// tasks.post("/create/:id/img", Auth.worker);