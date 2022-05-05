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
  updateMessage: async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.id);
      const msg = await task.messages.id(req.params.messageId);
      msg.content = req.body.content;
      await task.save();
      res.json({ message: "message updated" });
    } catch (error) {
      next(error);
    }
  },
  deleteMessage: async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.id);
      await task.messages.id(req.params.messageId).remove();
      await task.save();
      res.json({ message: "message removed" });
      //  await task.save(function (err) {
      //    if (err) return Error(err);
      //    console.log("the subdocs were removed");
      //    res.json({ message: "message removed" });
      //  });
    } catch (error) {
      next(error);
    }
  },
};
