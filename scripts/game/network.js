angular.module('app.network', [])
.factory('mySocket', function(ioLoader, $q, socketFactory) {
  console.log("mySocket factory");
  var mySocket = $q.defer();
  ioLoader.done().then(function(io) {
    var myIoSocket = io.connect(window.location.hostname+':8000');
    var aSock = socketFactory({
      ioSocket: myIoSocket
    });
    mySocket.resolve(aSock);
  });
  return mySocket.promise;
});
