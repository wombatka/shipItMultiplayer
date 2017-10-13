angular.module('app.menu')
.controller('MenuController', function($scope, mySocket) {
  var ctrl = this;

  $scope.messages = [];
  $scope.text='';
  $scope.socket = {};
  $scope.players = [];


  $scope.submit = function() {
    $scope.socket.emit('chat message', $scope.text);
    $scope.text = '';
  }

  mySocket.then(function(socket) {
    console.log("ouuuuuu");
    console.log(socket);
    $scope.socket = socket;
    socket.on('gameUpdated:add', function(data){
      console.log("meny >><><><><><><><><><");
      $scope.players.push(data.player);
      $scope.messages.push("we have a new player!!!! : " + data.player.id);
    });
    socket.on('chat message', function(msg){
      $scope.messages.push(msg);
    });
  });
});
