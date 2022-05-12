const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const Task = require("./Task");
const Worker = require("./Worker");
class Worker_Task extends Model {}
Worker_Task.init(
  {
    worker_id: {
      Type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Worker,
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
  },
  { sequelize, timestamps: true, modelName: "WorkerTask" }
);

module.exports = Worker_Task;
