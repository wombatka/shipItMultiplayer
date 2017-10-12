var Player = require('./Player.js');
module.exports = (function(app, io) {
  //console.log(io);
  console.log('io');
  // Game data
  var g = {
    io: io,
    players: [],
    maps: {}
  };


  // io.on('connection', function(socket){
  //   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  //   socket.on('disconnect', function(){
  //     console.log('user disconnected');
  //   });
  //
  // socket.on('chat message', function(msg){
  //   console.log('message: ' + msg);
  //
  //     io.emit('chat message', msg);
  //   });
  // });

  g.io.sockets.on('connection', function(socket) {
    socket.emit('connected', { id: socket.id });
    console.log("fjsdfisdhfiuhsdiufisudhfusdgfyusdgfysd");
    var player = new Player({ id: socket.id });
    g.players.push(player);
    console.log(player);
    socket.on('newPlayer', onNewPlayer);
  });

  var onNewPlayer = function(data) {
    // this.id is the socket id handling the event
    // playerbyId is a helper function
    var player = playerById(this.id);

    // Create the map if it doesn't already exist
    if (!g.maps[data.mapId]) {
      g.maps[data.mapId] = new Map({id: data.mapId});
    }

    if (!player.inMap(data.mapId)) {
      player.joinMap(g.maps[data.mapId]);

      this.broadcast.to(data.mapId)
        .emit('gameUpdated:add', {
          player: player.serialize(),
          map: data.mapId,
          allPlayers: g.maps[data.mapId].players
        });

      this.join(data.mapId); // join the socket group
      this.emit('gameUpdated:add', {
        map: data.mapId,
        allPlayers: g.maps[data.mapId].players
      });
    };
  };
});
