const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const Admin = require("./Admin");
const Client = require("./Client");
const Task = require("./Task");
const Worker = require("./Worker");

class Message extends Model {}
Message.init(
  {
    content: { type: DataTypes.STRING, allowNull: false },
    worker_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Worker,
        key: "id",
      },
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Client,
        key: "id",
      },
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Admin,
        key: "id",
      },
    },
    task_id: {
      Type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Task,
        key: "id",
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "worker", "client"),
      allowNull: false,
    },
  },
  { sequelize, timestamps: true }
);

module.exports = Message;
