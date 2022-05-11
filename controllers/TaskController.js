const Task = require("../models/Task");
const Token = require("../utils/token");
const { TaskNotFound, InvalidFile } = require("../errors");

module.exports = {

  getById: async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
  },

  delete: async (req, res) => {
    const task = await Task.findById(req.params.id);
    await task.delete({ _id: task._id });
    res.json({ message: "Task deleted" });
  },

  createTask: async (req, res) => {
    const { title, description, imgPath, clientId, workersID } = req.body;
    const task = await Task.create({
      title,
      description,
      imgPath,
      clientId,
      workersID,
    });
    res.json({
      message: "Task created!",
      task: {
        id: task.id,
        title,
        description,
        imgPath,
        clientId,
        workersID,
      },
    });
  },

  updateTask: async (req, res) => {
    const { title, description, imgPath, clientId, workersID } = req.body;
    await Task.updateOne(
      { _id: req.params.id },
      { title, description, imgPath, clientId, workersID }
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

  //Sends back file
  getImg: async (req, res, next) => {
    try {
      const task = await Task.findOne({ _id: req.params.id });
      res.sendFile(task.imgPath, { root: `${__dirname}/../` });
    } catch (error) {
      next(error);
    }
  },

  allTasks: async (req, res, next) => {
    const { id, role } = req.user;
    const searchQuery =
      role === "client"
        ? { clientId: id }
        : role === "worker"
        ? { workersID: id }
        : {};
    try {
      tasks = await Task.find(searchQuery);
      res.json({ tasks });
    } catch (error) {
      next(error);
    }
  },
};
