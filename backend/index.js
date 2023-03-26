import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const users = {};


//connection with socket.io
io.on("connection", (socket) => {

  //when new user join the chat
  socket.on("new-user", (name) => {
    users[socket.id] = name;
  });

  socket.on("send-message", (message) => {
    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const time = hours + ":" + minutes + " " + ampm;

    message &&
      socket.broadcast.emit("recieve", {
        message: message,
        name: users[socket.id],
        time: time,

      });
  });
});

httpServer.listen(4000, () => {
  console.log("server is started...");
});
