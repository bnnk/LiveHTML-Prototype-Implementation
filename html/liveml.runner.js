var socket = io();
window.onload = () => { socket.on('connectd', (socket) => { Connect() }) }
const liveEvent = (ename) => "live:" + encodeURIComponent(ename);
window.connect = Connect
function Connect(){
  app = document.getElementById("app-root");

  socket.on("blocks", function(blocks){
    blocks.forEach(block => bparsers[block.type](block.value, app))
  })
  socket.emit(liveEvent("loadhtml"), { user: socket.id, "url": location.href });
}

const liveml = {
  fullrender: Connect,
  onevent: function(e, ...onArgs){
    socket.on(liveEvent(e), ...onArgs)
  },
  offevent: function(e, ...offArgs){
    socket.off(liveEvent(e), ...offArgs)
  },
  emit: function(e, ...emitArgs){
    emitArgs.push({ user: socket.id, "url": location.href })
    socket.emit(liveEvent(e), ...emitArgs)
  }
}