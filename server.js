var PORT = process.env.PORT || 3000;
var express = require('express');
var moment = require('moment');
var now = moment();

var app = express();

// Creating server without express
var http = require('http').Server(app);

// Socket.io require
var io = require('socket.io')(http);

//Lets listen for events
io.on('connection', function(socket){
	console.log('User connected via socket.io!');

	// Listening for the message from the sender
	socket.on('message', function(message){
		console.log('Message recieved ' + message.text);

		//io.emit(); Sends the message to everybody incl. the sender
		//socket.broadcast.emit();
		// Sends the message to everybody except the sender.

		// Sending message
		//socket.broadcast.emit('message', message);
		message.timestamp = moment().valueOf();
		io.emit('message', message);
	});

	// takes 2 arguments event and body
	socket.emit('message', {
		text: 'Welcome to the chat application',
		timestamp: now.valueOf(),
		name: 'System' 
	});
});

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function(){
	console.log('Server started!');
});