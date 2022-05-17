const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Task = require("./Task");
const User = require("./User");

class Message extends Model {}
Message.init(
  {
    _id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: false },
<<<<<<< HEAD
=======

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
>>>>>>> 712139a3d420618cdc0355b69d60d7ffd042de8d
  },
  { sequelize, timestamps: true }
);

module.exports = Message;
