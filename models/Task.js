const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

class Task extends Model {}
Task.init(
  {
    _id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    imgPath: { type: DataTypes.STRING, allowNull: true },
    done: { type: DataTypes.BOOLEAN, defaultValue: false },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: {
      type: DataTypes.ENUM,
      values: ["InProgress", "done", "deleted", "notStarted"],
    },
  },
  { sequelize, timestamps: true }
);

module.exports = Task;
