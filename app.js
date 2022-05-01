const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectMongoDB = require("./database/connection");
const routes = require("./routes");
const logger = require('./middlewares/logger')

app.use(logger)
app.use(express.json())
app.use("/api/user", routes.user);
app.use("/api/tasks", routes.tasks);

app.use("api/tasks", routes.notFound);

connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});


