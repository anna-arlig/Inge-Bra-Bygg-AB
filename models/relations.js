const { User, Project, Message, Task } = require("./");

// 1:M
Project.hasMany(Task, { foreignKey: "tasks_pk" });
Task.belongsTo(Project, { foreignKey: "tasks_pk" });

//
// User.hasOne(Project, {foreignKey: 'clientId'})
Project.belongsTo(User, { foreignKey: "clientId" });

User.hasMany(Task, { foreignKey: { name: "workerId", allowNull: false } });
User.hasMany(Task, { foreignKey: { name: "clientId", allowNull: false } });

Worker_Task.belongsToMany(Worker, { foreignKey: "worker_Id", targetKey: "id" });
Worker_Task.hasMany(Task);
Task.belongsTo(Client);

Message.belongsTo(Task);
Task.hasMany(Message);

Message.hasOne(Worker);
Message.hasOne(Client);
Message.hasOne(Admin);
