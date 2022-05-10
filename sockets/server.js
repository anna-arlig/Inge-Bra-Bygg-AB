const express = require("express");
const app = express()
const http = require("http");
const Task = require('../models/Task')
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utilities/users");
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    allowedHeaders: ["my-custom-header"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  },
});

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

module.exports = {express, app, server, io}