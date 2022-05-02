const express = require("express");
const cors = require("cors");
const app = express();
const { errorHandler } = require("./errors/errorHandler");

const connectMongoDB = require("./database/connection");
const routes = require("./routes");
const logger = require("./middlewares/logger");
const { PORT } = require("./config");

app.use(cors());
app.use(logger);
app.use(express.json());
app.use("/api/user", routes.user);
app.use("/api/tasks", routes.tasks);
app.use(errorHandler);
app.use(routes.notFound);

const port = PORT || 5000;
connectMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
