const { Router } = require("express");
const tasks = new Router();
const Auth = require("../middlewares/auth");
const TaskController = require("../controllers/TaskController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Admin
// Get Specific Task
tasks.get("/getById/:id", Auth.verifyToken, Auth.admin, TaskController.getById);
// Delete Task
tasks.delete(
  "/delete/:id",
  Auth.verifyToken,
  Auth.admin,
  TaskController.delete
);

// Worker
// Create new Task
tasks.post("/create", Auth.verifyToken, Auth.worker, TaskController.createTask);

// Update Tasks
tasks.patch(
  "/update/:id",
  Auth.verifyToken,
  Auth.worker,
  Auth.updateMyTask,
  TaskController.updateTask
);

//Mark Task as done
tasks.patch(
  "/done/:id",
  Auth.verifyToken,
  Auth.worker,
  TaskController.markAsDone
);

//Mark Task as undone
tasks.patch(
  "/undone/:id",
  Auth.verifyToken,
  Auth.worker,
  TaskController.markAsUndone
);

//Upload img to Task
tasks.post(
  "/upload/:id/img",
  Auth.verifyToken,
  Auth.worker,
  upload.single("taskImg"),
  TaskController.uploadImg
);

//Get Image from Task
tasks.get("/getImg/:id/", Auth.verifyToken, Auth.myTask, TaskController.getImg);

// Get All Tasks
tasks.get("/allTasks", Auth.verifyToken, TaskController.allTasks);

module.exports = tasks;
