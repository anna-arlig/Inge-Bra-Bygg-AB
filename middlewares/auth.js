const { JWT_SECRET } = require("../config");
const {
  TokenExpired,
  Unauthorized,
  HackerAttempt,
  Forbidden,
  MessageNotFound,
} = require("../errors");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

module.exports = {

  async verifyToken(req, res, next) {
    try {
      try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const user = jwt.verify(token, JWT_SECRET);

        req.user = user;
        next();
      } catch (error) {
        console.log("error catched from json: ", error.message);
        if (error.name == "JsonWebTokenError") {
          throw new HackerAttempt();
        } else if (error.name == "TokenExpiredError") {
          throw new TokenExpired();
        } else {
          throw new Forbidden();
        }
      }
    } catch (error) {
      next(error);
    }
  },

  async admin(req, res, next) {
    try {
      const user = req.user;
      if (user.role != "admin") {
        throw new Unauthorized();
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  async adminWorker(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const admin = jwt.verify(token, JWT_SECRET);
      if (admin.role == "client") {
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
      const user = req.user;
      if (user.role != "client") {
        throw new Unauthorized();
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  async worker(req, res, next) {
    try {
      const user = req.user;
      if (user.role != "worker") {
        throw new Unauthorized();
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  async workerClient(req, res, next) {
    try {
      const user = req.user;
      if (user.role == "admin") {
        throw new Unauthorized();
      }
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
      const task = await Task.findById(taskId);
      const theMessage = task.messages.id(messageId);
      if (!theMessage) {
        throw new MessageNotFound(messageId);
      }
      if (theMessage.userId != userId) {
        throw new Forbidden();
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  async updateMyTask(req, res, next) {
    try {
      const user = req.user;
      const taskId = req.params.id;
      const task = await Task.findOne({ _id: taskId, workersID: user.id });
      if (!task) {
        throw new Forbidden();
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  async myTask(req, res, next) {
    try {
      const user = req.user;
      const taskId = req.params.id;
      const query =
        user.role == "worker"
          ? { workersID: user.id }
          : user.role == "client" && { clientId: user.id };
      const task = await Task.findOne({ _id: taskId, ...query });
      if (!task) {
        throw new Forbidden();
      }
      next();
    } catch (error) {
      next(error);
    }
  },
};
