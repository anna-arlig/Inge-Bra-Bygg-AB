const express = require("express");
const app = express()
const http = require("http");
const Task = require('../models/Task')
const server = http.createServer(app);
const MessageController = require('../controllers/MessageController')


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
    socket.join(rooms);
  });

  // Listen for chatMessage
  socket.on("message", ( msg ) => {
    console.log(msg)
    io.to(room).emit("message");
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
  console.log('User disconnected!')
  });
});

module.exports = {express, app, server, io}