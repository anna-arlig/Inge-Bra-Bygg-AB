const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Task = require("./Task");
const User = require("./User");

class Message extends Model {}
Message.init(
  {
    _id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, timestamps: true }
);

module.exports = Message;
