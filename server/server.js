var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require("path");

// Start the server
var port = process.env.PORT || 8000;
server.listen(port, function() {
  console.log("Running on port ", port);
});

// Serve the client
var staticPath = path.join(__dirname, '../client/dist');
app.use(express.static(__dirname+'/..'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/../index.html');
});
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

socket.on('chat message', function(msg){
  console.log('message: ' + msg);

    io.emit('chat message', msg);
  });
});

// Handle socket.io
require('./routes/io.js')(app, io);
