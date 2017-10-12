angular.module('app.game')
.controller('GameController', function() {

})
.directive('gameCanvas', function($injector) {
  var linkFn = function(scope, ele, attrs) {
    // link Function
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
