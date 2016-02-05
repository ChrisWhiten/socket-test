'use strict';

const server = require('http').createServer();
const io = require('socket.io')(server);

// set up the connection
io.on('connection', (socket) => {
  socket.on('test event', (data) => {
    console.log('data:', data);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

server.listen(3003);

// repeatedly send out a given message
const message = process.argv[2];
setInterval(() => {
  io.emit('test event', `Hello ${message}`);
}, 1000);
