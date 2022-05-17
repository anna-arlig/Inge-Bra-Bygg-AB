const { User, Project, Message, Task } = require("./");

// 1:M
Project.hasMany(Task, { foreignKey: "tasks_pk" });
Task.belongsTo(Project, { foreignKey: "tasks_pk" });

//
// User.hasOne(Project, {foreignKey: 'clientId'})
Project.belongsTo(User, { foreignKey: "clientId" });

// worker.hasMany(Tasks, {})
// client.hasMany(tasks)
// task.belongsTo(client)
// task.belongToMany(worker)

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
