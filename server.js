var express = require('express'),
	http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(8000);
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
