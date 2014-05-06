var express = require('express'),
	http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 8000);
server.listen(8000);
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


io.sockets.on('connection', function (socket) {
	//socket.emit('init',{ type: 'danger', msg: 'Alert: Something very wrong is happening.' });
	socket.on('admin:alert', function(data) {
		//console.log(data);
		socket.broadcast.emit('alert', data);
		//socket.emit('alert', data);
	});
    
});

