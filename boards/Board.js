var _ = require('lodash');
var serialPort = require('serialport');
var SerialPort = serialPort.SerialPort;
var BracketsProtocol = require('../protocols/brackets/BracketsProtocol');

module.exports = Board;

function Board() {

	this.baudRate = 115200;
	this.prefix = 'defaultBoard_';
	this.initializationTime = 2000;
	this.name ='Default Board';
	this.protocol = new BracketsProtocol();

	this.clients = [];
	this.commandQueue = {};
	this.connection = null;
	this.state = {};

	this.connect = connect.bind(this);

}

Board.prototype.init = function(){
	throw new Error('Please implement init function for Board ' + this.name);
};


function connect(port, next) {
	if (this.connection && this.connection.isOpen()) {
		return next();
	}

	this.connection = new SerialPort(String(port), {
		baudRate: this.baudRate
	});

	this.connection.on('error', (function() {
		this.broadcastError({
			message: this.name + ' failed to connect on port: ' + port
		});
	}).bind(this));

	this.connection.on('open', (function(err) {
		//It seems the board takes a couple seconds to initialize after first connecting. Only runs once on first connect.
		setTimeout(next, this.initializationTime);
		this.connected();
	}).bind(this));

	this.connection.on('data', this.protocol.receiveData.bind(this.protocol));
}

Board.prototype.connected = function() {
	this.protocol.on('receivedPacket', this.receivedPacket.bind(this));
};

Board.prototype.receivedPacket = function(args) {
	console.log('Received Packet ', args);
	//Error checking packet?  Maybe [1] is always the error code.
	var cmd = args[0];
	if (this.commandQueue[cmd]) {
		this.commandQueue[cmd](args);  //Maybe apply will be better.
	} else {
		this.updateState(args);
	}
};

Board.prototype.write = function(str) {
	if (!this.connection) {
		throw new Error(this.name + ' is not connected.  Remember to add a connect block at the top of your code.');
	}

	this.connection.write(str);
};

Board.prototype.addClient = function(socket) {
	var clients = this.clients;
	if (clients.indexOf(socket) < 0) {
		clients.push(socket);
		socket.on('disconnect', function() {
			_.remove(clients, socket);  //Mutates
		});
	}
};

Board.prototype.rawCommand = function(data) {
	this.write(String(data));
};

Board.prototype.runCommand = function() {
	var packet = this.protocol.toPacket.apply(this.protocol, arguments);
	this.write(packet);
};

Board.prototype.runCommandAndWait = function() {
	this.queueWait.apply(this, arguments);
	this.runCommand.apply(this, arguments);
};

Board.prototype.queueWait = function() {
	var cmd = arguments[0];  //Should already be converted by cmdCodeFromString
	var interpreterNext = arguments[arguments.length - 1]; //Next will always be the last argument on an asyncFunction in the interpreter.
	var originalArgs = Array.prototype.slice.call(arguments, 0, arguments.length - 1);

	var commandQueue = this.commandQueue;
	commandQueue[cmd] = function(args) {
		commandQueue[cmd] = null;  //Removes this pending command from the queue.
		interpreterNext(); //Tells the interpreter to continue

		//this.updateState(args, originalArgs);
	};
};

Board.prototype.broadcastError = function(err) {
	_.each(this.clients, function(socket) {
		socket.emit('protocol_error', err);
		socket.emit('finished', {runTime: 0});
	});
};

Board.prototype.broadcastState = function() {
	_.each(this.clients, function(socket) {
		socket.emit(this.prefix + 'state', this.state);
	}, this);
};

Board.prototype.updateState = function(args, originalArgs) {
	console.log('Update state not implemented for ', this.name);
};
