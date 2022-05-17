const { User, Project, Message, Task } = require("../models");
const sequelize = require("./connection");
// 1:M
Project.hasMany(Task, { foreignKey: "tasksId" });
Task.belongsTo(Project, { foreignKey: "tasksId" });

Message.belongsTo(Task, { foreignKey: "taskId" });
Message.belongsTo(User, { foreignKey: "userId" });
Task.hasMany(Message, { foreignKey: "taskId" });

User.hasMany(Task, { foreignKey: { name: "workerId", allowNull: false } });
Task.belongsTo(User, {
  foreignKey: "worker_id",
});

User.hasMany(Task, { foreignKey: "clientId" });
Task.belongsTo(User, { foreignKey: "clientId" });

Task.hasMany(Message, { foreignKey: "taskId" });
Message.belongsTo(Task, { foreignKey: "taskId" });

sequelize.authenticate().then(() => {
  User.sync({ force: true });
  Project.sync({ force: true });
  Task.sync({ force: true });
  Message.sync({ force: true });
  User.bulkCreate(
    {
      name: "David",
      role: "admin",
      email: "david@ibb.se",
      password: "grillkorv",
      address: {
        city: "Stockholm",
        street: "Sveavagen",
        zipCode: "123-34",
      },
    },
    {
      name: "Johan",
      role: "worker",
      email: "johan@ibb.se",
      password: "123",
      address: {
        city: "Stockholm",
        street: "Sveavagen",
        zipCode: "123-34",
      },
    },
    {
      name: "Erika",
      role: "worker",
      email: "Erika@ibb.se",
      password: "123",
      address: {
        city: "Stockholm",
        street: "Sveavagen",
        zipCode: "123-34",
      },
    },
    {
      name: "Misa",
      role: "client",
      email: "misa@se.se",
      password: "123",
      address: {
        city: "Stockholm",
        street: "Sveavagen",
        zipCode: "123-34",
      },
    },
    {
      name: "Miso",
      role: "client",
      email: "miso@se.se",
      password: "123",
      address: {
        city: "Stockholm",
        street: "Sveavagen",
        zipCode: "123-34",
      },
    }
  );
  console.log("Users created");
});
