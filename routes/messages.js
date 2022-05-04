const { Router } = require("express");
const messages = new Router();
const Auth = require("../middlewares/auth");
const MessageController = require("../controllers/MessageController");

// messages.post("/sendMessage", Auth.workerClient, MessageController.sendMessage);
// Send Message / Worker, Client
messages.post(
  "/:id/sendmessage",
  Auth.workerClient,
  MessageController.sendMessage
);
// Get Specific Task Messages / Worker, Client
messages.get("/:id/messages", Auth.workerClient);
// Update message /Worker, client
messages.patch(
  "/:id/updateMessage/:messageId",
  Auth.workerClient,
  Auth.myMessage,
  MessageController.updateMessage
);
messages.patch(
  "/:id/updateMessage/:messageId",
  Auth.workerClient,
  Auth.myMessage,
  MessageController.deleteMessage
);
module.exports = messages;
