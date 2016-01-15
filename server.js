// 16

var PORT = process.env.PORT || 3000;
var express = require('express');
var moment = require('moment');
var now = moment();

var app = express();

// Creating server without express
var http = require('http').Server(app);

// Socket.io require
var io = require('socket.io')(http);


var clientInfo = {};

// Sends current users to provided socket
function sendCurrentUsers(socket){
	var info = clientInfo[socket.id];
	var users = [];

	if(typeof info === 'undefined'){
		return;
	}

	// Returns array of all the attributes on that obj
	Object.keys(clientInfo).forEach(function(socketId){
		var userInfo = clientInfo[socketId];
		if(info.room === userInfo.room){

			users.push(userInfo.name);
		}

	});

	socket.emit('message', {
		name: 'System',
		text: 'Current Users: ' + users.join(', '),
		timestamp: moment.valueOf()
	});
}

//Lets listen for events
io.on('connection', function(socket) {
	console.log('User connected via socket.io!');

	//Adding disconnect message
	socket.on('disconnect', function() {
		var userData = clientInfo[socket.id];
		if (typeof userData.name !== 'undefined') {
			socket.leave(userData.room);

			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left! ',
				timestamp: moment.valueOf()
			});

			delete clientInfo[socket.id];
		}
	});

	socket.on('joinRoom', function(req) {
		// Saving client info
		clientInfo[socket.id] = req;

		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment.valueOf()
		});
	});

	// Listening for the message from the sender
	socket.on('message', function(message) {
		console.log('Message recieved ' + message.text);

		//io.emit(); Sends the message to everybody incl. the sender
		//socket.broadcast.emit();
		// Sends the message to everybody except the sender.

		// Sending message
		//socket.broadcast.emit('message', message);

		if (message.text === '@currentUsers') {
			sendCurrentUsers(socket);
		} else {
			message.timestamp = moment().valueOf();
			io.to(clientInfo[socket.id].room).emit('message', message);
		}

	});

	// takes 2 arguments event and body
	socket.emit('message', {
		text: 'Welcome to the chat application',
		timestamp: now.valueOf(),
		name: 'System'
	});
});

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function() {
	console.log('Server started!');
});