const User = require("./User");
const Task = require("./Task");
const Message = require("./Message");

User.hasMany(Task, { foreignKey: { name: "workerId", allowNull: false } });
User.hasMany(Task, { foreignKey: { name: "clientId", allowNull: false } });

Task.hasOne(User, { foreignKey: { name: "clientId", allowNull: false } });
Task.hasMany(User, { foreignKey: { name: "workersIds", allowNull: false } });
Task.belongsToMany(User, { through: "WorkerTask" });
Task.belongsTo(User, {
  foreignKey: "workerId",
}); //med en foregin key
Task.belongsTo(User, { foreignKey: "clientId" }); // create clientId in Tasks
Task.hasMany(Message, { foreignKey: "taskId" });

Message.belongsTo(Task, { foreignKey: "taskId" });
Message.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Task, Message };
