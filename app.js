/////     REQUIRED PACKAGES     /////

var express = require('express'),
	app = express(),
	compression = require('compression'),
	path = require('path'),
	server = require('http').Server(app),
	io = require('./helpers/socket')(server);

// enable compression
app.use(compression({
	level : 9
}));

// static (public) directory
app.use(express.static(path.join(__dirname, 'public')));

// set all routes to hit static template. We'll handle routing on the front-end
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, 'app.html'));
});

// start server
server.listen(80);

module.exports = app;
