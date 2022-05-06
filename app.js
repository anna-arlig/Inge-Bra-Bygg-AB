const { express, app, server } = require("./sockets/server");
const cors = require("cors");
const { errorHandler } = require("./errors/errorHandler");

const connectMongoDB = require("./database/connection");
const routes = require("./routes");
const logger = require("./middlewares/logger");
const { PORT } = require("./config");

app.use(cors());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user", routes.user);
app.use("/api/tasks", routes.tasks);
app.use("/api/task", routes.messages);
app.use(errorHandler);
app.use(routes.notFound);

const port = PORT || 5000;
connectMongoDB().then(() => {
  server.listen(port, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
