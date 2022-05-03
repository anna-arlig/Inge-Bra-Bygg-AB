const { JWT_SECRET } = require("../config");
const { TokenExpired, Unauthorized } = require("../errors");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

module.exports = {
  async admin(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const admin = jwt.verify(token, JWT_SECRET);
      if (admin.role != "admin") {
        console.log("Unauthorized!", admin);
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
        console.log("Unauthorized!");
        throw new Unauthorized();
      }
      req.user = client;
      next();
    } catch (error) {
      res.status(401).send({ error: "Unauthorized" });
    }
  },
  async worker(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const worker = jwt.verify(token, JWT_SECRET);
      console.log("den här koden körs");
      if (worker.role != "worker") {
        console.log("Unauthorized!", worker);
        throw new Error("User is not worker!");
      }
      req.user = worker;
      next();
    } catch (error) {
      res.status(401).send({ error: "Unauthorized" });
    }
  },
  async workerClient(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = jwt.verify(token, JWT_SECRET);
      console.log("user role from auth clientWorker:", user.role);
      if (user.role == "worker" || user.role == "client") {
        req.user = user;
      } else {
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
      res.status(401).send({ error: "Not logged in" });
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
        throw new Unauthorized();
      }
    } catch (error) {
      next(error);
    }
  },
};
