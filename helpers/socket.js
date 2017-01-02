module.exports = function(server){
	var io = require('socket.io')(server);

	io.on('connection', function(socket) {

		var clients = [];

		for (var i in io.sockets.sockets) {
			clients.push({
				id: io.sockets.sockets[i].id,
				isController: (typeof io.sockets.sockets[i].isController !== 'undefined') ? io.sockets.sockets[i].isController : false
			});
		}

		console.log(clients)

		io.emit('clients', clients);

		// receive information
		socket.on('up', function(n) {
			io.sockets.sockets[n].emit('up');
		});
		socket.on('down', function(n) {
			io.sockets.sockets[n].emit('down');
		});
		socket.on('left', function(n) {
			io.sockets.sockets[n].emit('left');
		});
		socket.on('right', function(n) {
			io.sockets.sockets[n].emit('right');
		});
		socket.on('controllerStatus', function(n) {
			socket.isController = n;
		});
	});

	io.on('error', function(err){
		throw err;
	});

	return io;
};