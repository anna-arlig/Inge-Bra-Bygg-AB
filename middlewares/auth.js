const { JWT_SECRET } = require("../config");
const { TokenExpired, Unauthorized, Forbidden } = require("../errors");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

module.exports = {
  async admin(req, res, next) {
    console.log("req params :", req.params.id);
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const admin = jwt.verify(token, JWT_SECRET);
      if (admin.role != "admin") {
        console.log("User is not admin!", admin);
        throw new Unauthorized();
      }
      req.user = admin;
      next();
    } catch (error) {
      next(error);
    }
  },

  async client(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const client = jwt.verify(token, JWT_SECRET);
      if (client.role != "client") {
        console.log("User is not client!", client);
        throw new Unauthorized();
      }
      req.user = client;
      next();
    } catch (error) {
      next(error);
    }
  },
  async worker(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const worker = jwt.verify(token, JWT_SECRET);
      if (worker.role != "worker") {
        console.log("User is not worker!", worker);
        throw new Unauthorized();
      }
      req.user = worker;
      next();
    } catch (error) {
      next(error);
    }
  },
  async workerClient(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = jwt.verify(token, JWT_SECRET);
      if (user.role == "worker" || user.role == "client") {
        req.user = user;
      } else {
        console.log("user is neither worker nor client: ", user);
        throw new Unauthorized();
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  async loggedin(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = jwt.verify(token, JWT_SECRET);
      if (!user) {
        console.log("Not logged in!");
        throw new Error();
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },

  async myMessage(req, res, next) {
    try {
      const userId = req.user.id;
      const messageId = req.params.messageId;
      const taskId = req.params.id;
      console.log("My message authentication: ", taskId, req.user, messageId);
      const task = await Task.findById(taskId);
      const theMessage = task.messages.find((msg) => msg._id == messageId);
      console.log("the message: ", theMessage);
      if (theMessage.userId != userId) {
        throw new Forbidden();
      }
      next()
    } catch (error) {
      next(error);
    }
  },
};
