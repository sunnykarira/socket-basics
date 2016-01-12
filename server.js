var PORT = process.env.PORT || 3000;
var express = require('express');

var app = express();

// Creating server without express
var http = require('http').Server(app);

// Socket.io require
var io = require('socket.io')(http);

//Lets listen for events
io.on('connection', function(){
	console.log('User connected via socket.io!');
});

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function(){
	console.log('Server started!');
});