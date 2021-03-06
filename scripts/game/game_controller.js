angular.module('app.game')
.controller('GameController', function($scope, mySocket, $rootScope) {
  mySocket.then(function(socket) {
    console.log("?????????Socket??????????");
    console.log(socket);
    socket.on('gameUpdated:add', function(data){
      console.log(">><><><><><><><><><");
      if ($rootScope.players.length == 2) {
        console.log("THERES TWO OF US");
        loadStartGameState();
      }
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
  });
})
.directive('gameCanvas', function($injector, $rootScope) {
  var linkFn = function(scope, ele, attrs) {
    console.log("create game");
    createGame(scope, $rootScope.players, scope.mapId, $injector);
    console.log("=============scope==============");
    console.log(scope);
    console.log("=============scope==============");

  };

  return {
    scope: {
      players: '=',
      mapId: '='
    },
    template: '<div id="gameCanvas"></div>',
    link: linkFn
  }
});
