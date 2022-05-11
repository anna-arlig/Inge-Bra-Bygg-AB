const { errorHandler } = require("./errors/errorHandler");
const routes = require("./routes");
const logger = require("./middlewares/logger");
const sequelize = require("./database/connection");
const { PORT } = require("./config");
const cors = require("cors");
const { express, app, server } = require("./sockets/server");

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user", routes.user);
app.use("/api/tasks", routes.tasks);
app.use("/api/task", routes.messages);
app.use(routes.notFound);
app.use(errorHandler);

const port = PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database has been established successfully.");
    server.listen(port, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
