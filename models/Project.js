const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
class Project extends Model {}

Project.init(
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
  { sequelize, modelName: "Project" }
);

module.exports = Project;
