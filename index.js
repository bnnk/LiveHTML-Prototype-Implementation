const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);
const liveEvent = (ename) => "live:" + encodeURIComponent(ename)
const gamedirectory = path.join(__dirname, "html");

app.use(express.static(gamedirectory));

httpserver.listen(3000);

var rooms = [];
var usernames = [];

io.on('connection', function(socket){
  socket.emit("connectd")
  socket.on(liveEvent("loadhtml"), function(payload){
    console.log(payload)
    socket.emit("blocks", [{ type: "htmlw", value: `
    <h1 onclick="liveml.emit('yoclick')">Hello!</h1>
    <br /><h2></h2> 
    ` }])
  })
  socket.on(liveEvent("yoclick"), function(payload){
    console.log(payload)
    socket.emit("blocks", [
      { type: "ecss", value: ["h2", "color: #ff6600;"] },
      { type: "ehtmlw", value: ["h2", "payload.user: " + payload.user] }
    ])
  })
})
