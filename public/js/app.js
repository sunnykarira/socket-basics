var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'Anonymous';

// Update h1 tag by chat room
jQuery('.room-title').text(room);

console.log(name + ' joined ' + room);

// When client connects to server
socket.on('connect', function(){
	console.log('Connected to socket.io server!');

	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function(message){

	var momentTimestamp = moment.utc(message.timestamp);
	var finalTimestamp = momentTimestamp.local().format('h:mm A');
	console.log('New message:');
	console.log(finalTimestamp + ' ' + message.text);

	var $message = jQuery('.messages');

	$message.append('<p><strong>'+ message.name + ' ' + finalTimestamp + ': </strong></p>');
	$message.append('<p>'+ message.text +'</p>');
	// Showing messages on page
	//jQuery('.messages').append('<p><strong>'+ finalTimestamp+ ': ' +'</strong>' + message.text + '</p>');
});

// Grabbing input from form
// takes a selector or selecting by id
// $form stores jQuery element
var $form = jQuery('#message-form');

$form.on('submit', function(event){
	console.log(event);

	var $message = $form.find('input[name = message]');
	// Dont want to submit traditional way rather than refreshing the page.
	event.preventDefault();
	socket.emit('message', {
		// val() converts to string
		text: $message.val(),
		name: name
	});

	// Clearing the form (containg the message)
	$message.val('');
});