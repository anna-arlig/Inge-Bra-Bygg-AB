const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const Client = require("./Client");

class Task extends Model {}
Task.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    imgPath: { type: DataTypes.STRING, allowNull: true },
    done: { type: DataTypes.BOOLEAN, defaultValue: false },
    client_id: {
      Type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "id",
      },
    },
  },
  { sequelize, timestamps: true }
);

module.exports = Task;
