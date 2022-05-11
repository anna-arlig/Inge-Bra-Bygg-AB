const { Router } = require("express");
const messages = new Router();
const Auth = require("../middlewares/auth");
const MessageController = require("../controllers/MessageController");


// Send Message / Worker, Client
messages.post(
  "/:id/sendmessage",
  Auth.verifyToken,
  Auth.workerClient,
  Auth.myTask,
  MessageController.sendMessage
);

// Get Specific Task Messages / Worker, Client
messages.get("/:id/messages", Auth.verifyToken, Auth.workerClient);

// Update message /Worker, client
messages.patch(
  "/:id/updateMessage/:messageId",
  Auth.verifyToken,

  Auth.workerClient,
  Auth.myMessage,
  MessageController.updateMessage
);

messages.delete(
  "/:id/deleteMessage/:messageId",
  Auth.verifyToken,

  Auth.workerClient,
  Auth.myMessage,
  MessageController.deleteMessage
);

module.exports = messages;
