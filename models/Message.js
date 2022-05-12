const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Task = require("./Task");
const User = require("./User");

class Message extends Model {}
Message.init(
  {
    content: { type: DataTypes.STRING, allowNull: false },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    taskId: {
      Type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Task,
        key: "id",
      },
    },
  },
  { sequelize, timestamps: true }
);

module.exports = Message;
