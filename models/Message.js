const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seenBy: {
      type: Array, default: []
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {MessageSchema, Message}
