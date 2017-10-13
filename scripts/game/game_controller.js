angular.module('app.game')
.controller('GameController', function($scope, mySocket) {
  mySocket.then(function(socket) {
    console.log("?????????Socket??????????");
    console.log(socket);
    socket.on('gameUpdated:add', function(data){
      console.log(">><><><><><><><><><");
    })
  });
})
.directive('gameCanvas', function($injector) {
  var linkFn = function(scope, ele, attrs) {
    console.log("create game");
    createGame(scope, scope.players, scope.mapId, $injector);
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
