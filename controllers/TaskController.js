const Task = require("../models/Task");
const User = require("../models/User");
const {  TaskNotFound, InvalidFile, UserNotFound, WrongRole } = require("../errors");
const { findById } = require("../models/Task");

module.exports = {

  getById: async (req, res, next) => {
    try{
      const task = await Task.findById(req.params.id);
      if(!task){
        throw new TaskNotFound(req.params.id)
      }
      res.json(task);
    }catch(error){
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try{
      const task = await Task.findById(req.params.id);
      if(!task){
        throw new TaskNotFound(req.params.id)
      }
      await task.delete({ _id: task._id });
      res.json({ message: "Task deleted" });

    }catch(error){
      next(error)
    }
  },

  createTask: async (req, res, next) => {
    const { title, description, imgPath, clientId, workersID } = req.body;

    try{
      const client = await User.findById(clientId)
    if(!client){
      throw new UserNotFound(clientId)
    }
    if(client.role == "worker" || client.role == "admin"){
      throw new WrongRole(clientId, "client")
    }

    for (let workerId of workersID){
      const worker = await User.findById(workerId)
      if(!worker){
        throw new UserNotFound(workerId)
      }
      if(worker.role != "worker"){
        throw new WrongRole(workerId, "worker")
      }
    }
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

    }catch(error){
      next(error)
    }
  },

  updateTask: async (req, res, error) => {
    const { title, description, imgPath, clientId, workersID } = req.body;

    try{
      const task = await findById(req.params.id)
      if(!task){
        throw new TaskNotFound(req.params.id)
      }
      await Task.updateOne(
        { _id: req.params.id },
        { title, description, imgPath, clientId, workersID }
      );
      res.json("Task updated!");
    }catch(error){
      next(error)
    }

  },

  markAsDone: async (req, res) => {
    try{
      const task = await Task.findById(req.params.id)
      if(!task){
        throw new TaskNotFound(req.params.id)
      }
      await Task.updateOne({ _id: req.params.id }, { done: true });
      res.json("Task is marked as done!");
    }catch(error){
      next(error)
    }
  },

  markAsUndone: async (req, res) => {
    try{
      const task = await Task.findById(req.params.id)
      if(!task){
        throw new TaskNotFound(req.params.id)
      }
    await Task.updateOne({ _id: req.params.id }, { done: false });
    res.json("Task is marked as undone!");
  }catch(error){
    next(error)
  }
  },

  uploadImg: async (req, res, next) => {
    try {
      if (!req.file.mimetype.startsWith("image/")) {
        throw new InvalidFile("File must be image!");
      }
      const task = await Task.findById(req.params.id)
      if(!task){
        throw new TaskNotFound(req.params.id)
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
      if(!task){
        throw new TaskNotFound(req.params.id)
      }
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
      const tasks = await Task.find(searchQuery);
      res.json({ tasks });
    } catch (error) {
      next(error);
    }
  },
};
