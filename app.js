const { errorHandler } = require("./errors/errorHandler");

const connectMongoDB = require("./database/connection");
const routes = require("./routes");
const logger = require("./middlewares/logger");
const { PORT } = require("./config");
const Task = require("./models/Task");
const express = require("express");
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./sockets/utilities/users");
const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:8080" },
});

app.use(logger);

io.on("connection", async (socket) => {
  console.log("user connected");
  socket.on("joinRooms", ({ rooms, user }) => {
    // const user = userJoin(socket.id, user.name, rooms);

    socket.join(rooms);

    // // Welcome current user
    // socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // // Broadcast when a user connects
    // socket.broadcast
    //   .to(user.room)
    //   .emit(
    //     "message",
    //     formatMessage(botName, `${user.username} has joined the chat`)
    //   );

    // // Send users and room info
    // io.to(user.room).emit("roomUsers", {
    //   room: user.room,
    //   users: getRoomUsers(user.room),
    // });
  });

  // Listen for chatMessage
  socket.on("message", async ({ msg, user, room }) => {
    const newMessage = {
      content: msg,
      userId: user._id,
    };
    const task = await Task.findOneAndUpdate(
      {
        _id: room,
      },
      { $push: { messages: newMessage } },
      { safe: true, upsert: true, new: true }
    );

    console.log(
      "updated task from mongoose before emitting to frontend: ",
      task
    );
    // io.emit('newMsg', room)
    io.to(room).emit("message", task);
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

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
