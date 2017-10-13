angular.module('app.menu')
.controller('MenuController', function() {
  var ctrl = this;
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
  socket.on('gameUpdated:add', function(data){
    $('#messages').append($('<li>').text("A NEW PLAYER JOINED THE GAME: " + data.player.id));
  });
});
