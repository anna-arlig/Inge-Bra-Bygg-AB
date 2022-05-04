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
      console.log(msg)
      const updatedmsg =  await msg.updateOne({content: req.body.content})
      console.log(updatedmsg)
      res.json({ message: "message updated" });
    } catch (error) {
      next(error);
    }
  },
  deleteMessage: async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.id);
      task.messages.id(_id).remove();
      task.save(() => {
        if (err) throw new Error();
        res.json({ message: "message removed" });
      });
    } catch (error) {
      next(error);
    }
  },
};
