angular.module('app.game', [])
.config(function($stateProvider) {
  $stateProvider
    .state('game', {
      url: '/game',
      abstract: true,
      template: '<div class="game"><div ui-view></div></div>'
    })
   .state('game.play', {
      url: '/id',
      template: '<div game-canvas></div>',
      controller: 'GameController'
    })
});
