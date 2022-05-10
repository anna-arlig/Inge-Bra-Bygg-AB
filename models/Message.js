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
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
module.exports = {MessageSchema}
=======
module.exports = { MessageSchema };
>>>>>>> 1cccea9dab0a639c49a7fd8203766801a351380f
