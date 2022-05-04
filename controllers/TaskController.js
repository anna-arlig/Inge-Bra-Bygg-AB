const Task = require("../models/Task");
const Token = require("../utils/token");
const { TaskNotFound, InvalidFile } = require("../errors");

module.exports = {
  all: async (req, res) => {
    const tasks = await Task.find({});
    res.json({ tasks });
  },
  getById: async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
  },
  delete: async (req, res) => {
    const task = await Task.findById(req.params.id);
    console.log("task to be deleted:", task);
    await task.delete({ _id: task._id });
    res.json({ message: "Task deleted" });
  },
  //Fix validation (clientId is client, workerID is worker)
  createTask: async (req, res) => {
    const { title, desciption, imgPath, clientId, workersID } = req.body;
    const task = await Task.create({
      title,
      desciption,
      imgPath,
      clientId,
      workersID,
    });
    res.json({
      message: "Task created!",
      task: {
        id: task.id,
        title,
        desciption,
        imgPath,
        clientId,
        workersID,
      },
    });
  },
  updateTask: async (req, res) => {
    const { title, desciption, imgPath, clientId, workersID } = req.body;
    await Task.updateOne(
      { _id: req.params.id },
      { title, desciption, imgPath, clientId, workersID }
    );
    res.json("Task updated!");
  },
  markAsDone: async (req, res) => {
    await Task.updateOne({ _id: req.params.id }, { done: true });
    res.json("Task is marked as done!");
  },
  markAsUndone: async (req, res) => {
    await Task.updateOne({ _id: req.params.id }, { done: false });
    res.json("Task is marked as undone!");
  },
  uploadImg: async (req, res, next) => {
    try {
      if (!req.file.mimetype.startsWith("image/")) {
        throw new InvalidFile("File must be image!");
      }
      await Task.updateOne({ _id: req.params.id }, { imgPath: req.file.path });
      res.json("File uploaded!");
    } catch (error) {
      next(error);
    }
  },
  getImg: async (req, res, next) => {
    try {
      const image = await Task.findOne({ _id: req.params.id });
      res.json({ image });
    } catch (error) {
      next(error);
    }
  },
  allClientTasks: async (req, res) => {
    try {
      console.log("clientId: ", req.user.id);
      const myTasks = await Task.find({ clientId: req.user.id });
      res.json({ myTasks });
    } catch (error) {
      next(error);
    }
  },
  allWorkerTasks: async (req, res) => {
    // Get All User Tasks
    console.log("getting user task:");
    // try {
    //   const myTasks = await Task.find({ clientId: req.user.id });
    //   res.json({ tasks: myTasks });
    // } catch (error) {
    //   next(error);
    // }
    res.json({ message: "in all my tasks controller" });
    // Get All Worker Tasks
  },
};
