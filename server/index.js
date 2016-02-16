'use strict';

var server = require('http').createServer(function(req, res) {
  console.log('got a request', req.url);
  if (req.url === '/index.html') {
    res.writeHead(200);
    res.end();
    return;
  }
});
var io = require('socket.io')(server);
var redis = require('socket.io-redis');
io.adapter(redis({host: 'localhost', port: 6379}));

// set up the connection
io.on('connection', function (socket) {
  socket.on('test event', function (data) {
    console.log('data:', data);
  });

  socket.on('disconnect', function () {
    console.log('disconnected');
  });
});

server.listen(process.argv[2]);

// repeatedly send out a given message
var message = process.argv[3];
setInterval(function () {
  io.sockets.emit('test event', 'Hello ' + message);
}, 100);
