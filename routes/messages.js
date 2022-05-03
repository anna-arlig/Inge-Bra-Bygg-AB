const { Router } = require("express");
const messages = new Router();
const Auth = require("../middlewares/auth");
const MessageController = require("../controllers/MessageController");


messages.post("/sendMessage", MessageController.sendMessage )

module.exports = messages;