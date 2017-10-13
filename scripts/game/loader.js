angular.module('app.loader', [])
.provider('ioLoader', function() {
  this.scriptUrl = window.location.origin+':8000/socket.io/socket.io.js';

  this.$get = function($window, $document, $q) {
    var defer = $q.defer(), scriptUrl = this.scriptUrl;

    return {
      done: function(){
        var onScriptLoad=function(){return defer.resolve($window.io);};
        console.log("loader --- done");
        if($window.io) { onScriptLoad(); } else {
          var scriptTag = $document[0].createElement('script');
          scriptTag.type = 'text/javascript';
          scriptTag.async = true;
          scriptTag.src = scriptUrl;
          scriptTag.onreadystatechange = function () {
            if (this.readyState === 'complete') {
              onScriptLoad();
            }
          };
          scriptTag.onload = onScriptLoad;
          $document[0].getElementsByTagName('head')[0]
            .appendChild(scriptTag);
        }
        return defer.promise;
      }
    };
  };
});
