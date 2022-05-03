const Task = require("../models/Task");
const Token = require("../utils/token");
const { Message } = require("../models/Message");

module.exports = {
  sendMessage: async (req, res) => {
    try {
      const newMessage = {
        content: req.body.content,
        userId: req.user.id,
      };
      console.log("add new message:", newMessage);
      //"626eb5be81442f2d164219af"
      const task = await Task.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $push: { messages: newMessage } },
        { safe: true, upsert: true }
      );
      res.json({ message: "Message sent!" });
    } catch (error) {
      next(error);
    }
  },
  updateMessage: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      console.log("task from database:", task);
      const msg = task.messages.id(req.params.messageId);
      msg.content = req.body.content;
      res.json({ message: "message updated" });
    } catch (error) {
      next(error);
    }
  },
};
