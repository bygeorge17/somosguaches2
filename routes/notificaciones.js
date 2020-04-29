var express = require('express');
const app = express();
const server = app.listen(3001,console.log("Socket.io Hello Wolrd server started!"));
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  //console.log("Client connected!");
  socket.on('message-from-client-to-server', (msg) => {
  })
  socket.emit('message-from-server-to-client', 'Hello World!');
});
