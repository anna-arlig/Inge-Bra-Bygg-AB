const { Router } = require("express");
const tasks = new Router();
const Auth = require("../middlewares/auth");
const TaskController = require("../controllers/TaskController");

// Admin
// Get All Tasks
tasks.get("/all", TaskController.all);
// Get Specific Task
tasks.get("/:id", Auth.admin, TaskController.getById);
// Delete Task
tasks.delete("/delete/:id", Auth.admin, TaskController.delete);

// Worker
// Create new Task
tasks.post("/create", Auth.worker, TaskController.createTask);
// Update Tasks
tasks.patch("/update/:id", Auth.worker, TaskController.updateTask);
//Mark Task as done
tasks.patch("/done/:id", Auth.worker, TaskController.markAsDone);
//Mark Task as undone
tasks.patch("/undone/:id", Auth.worker, TaskController.markAsUndone);

// Client
// Get Tasks' clients / Admin
tasks.get("/client/:id", Auth.admin);

//All
tasks.get("/allmytasks");

module.exports = tasks;

// tasks.post("/create/:id/img", Auth.worker);
