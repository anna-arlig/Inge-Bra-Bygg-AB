<<<<<<< HEAD
const { User, Project, Message, Task } = require("./");

// 1:M
Project.hasMany(Task, { foreignKey: "tasks_pk" });
Task.belongsTo(Project, { foreignKey: "tasks_pk" });

//
// User.hasOne(Project, {foreignKey: 'clientId'})
Project.belongsTo(User, { foreignKey: "clientId" });
=======
const User = require("./User");
const Task = require("./Task");
const Message = require("./Message");
>>>>>>> 712139a3d420618cdc0355b69d60d7ffd042de8d

User.hasMany(Task, { foreignKey: { name: "workerId", allowNull: false } });
User.hasMany(Task, { foreignKey: { name: "clientId", allowNull: false } });

<<<<<<< HEAD
// Flavor.hasMany(User, { foreignKey: "vote" });
// User.belongsTo(Flavor, { foreignKey: "vote", targetKey: "id" });

Worker_Task.belongsToMany(Worker, { foreignKey: "worker_Id", targetKey: "id" });
Worker_Task.hasMany(Task);
Task.belongsTo(Client);

Message.belongsTo(Task);
Task.hasMany(Message);

Message.hasOne(Worker);
Message.hasOne(Client);
Message.hasOne(Admin);

Worker.hasMany(Message);
Worker.hasMany(Task);

Client.hasMany(Task);
Client.hasMany(Message);

Admin.hasMany(Message);
=======
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
>>>>>>> 712139a3d420618cdc0355b69d60d7ffd042de8d
