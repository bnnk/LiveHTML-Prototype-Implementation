const http = require("http");
const express = require("express");
// const { Server } = require("socket.io");
const socketio = require("socket.io");
const path = require("path");
const { instrument } = require("@socket.io/admin-ui");

const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver, {
  cors: {
    origin: ["*"],
    credentials: true
  }
});
const liveEvent = (ename) => "live:" + encodeURIComponent(ename)
const gamedirectory = path.join(__dirname, "html");

app.use(express.static(gamedirectory));
// instrument(io, {
//   auth: false
// });

httpserver.listen(3000);

var usernames = [];

io.on('connection', function(socket){
  socket.emit("connectd")
  socket.on(liveEvent("loadhtml"), function(payload){
    usernames.push(payload.user)
    console.log("LiveHTML::Load", payload)
    socket.emit("blocks", [{ type: "htmlw", value: `
    <h1 onclick="liveml.emit('yoclick')">Hello!</h1>
    <h2></h2><h4>Hello</h4> 
    ` }])
  })
  socket.on(liveEvent("yoclick"), function(payload){
    console.log("LiveHTML::OnClick", payload)
    usernames.forEach((id, index) => {
      socket.to(id).emit("blocks", [
        { type: "ehtmlw", value: ["h4", "User " + payload.user + " has helloed " + id + ". <(*ΦωΦ*)>"] },
        { type: "js", value: `var audio = new Audio('Ding.mp3'); audio.play()` }
      ])
    })
    socket.emit("blocks", [
      { type: "ecss", value: ["h2", "color: #ff6600;"] },
      { type: "ehtmlw", value: ["h2", "payload.user: " + payload.user] },
      { type: "ehtmlw", value: ["h4", "You hellowd all. <(*ΦωΦ*)>"] }
    ])
  })
})

