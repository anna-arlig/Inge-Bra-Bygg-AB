const { Router } = require("express");
const tasks = new Router();
const Auth = require("../middlewares/auth");
const TaskController = require("../controllers/TaskController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Admin
// Get All Tasks
tasks.get("/all", Auth.admin, TaskController.all);
// Get Specific Task
tasks.get("/getById/:id", Auth.admin, TaskController.getById);
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
//Upload img to Task
tasks.post(
  "/upload/:id/img",
  Auth.worker,
  upload.single("taskImg"),
  TaskController.uploadImg
);
//Get Images from Task
tasks.get("/getImg/:id/", Auth.loggedin, TaskController.getImg);

//All Tasks
tasks.get("/allmytasks", Auth.workerClient, TaskController.allTasks);
// Client
// Get Tasks' clients / Admin
// tasks.get("/:id/clients", Auth.admin);

module.exports = tasks;
