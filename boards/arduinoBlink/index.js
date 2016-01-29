var _ = require('lodash');
var serialPort = require('serialport');
var SerialPort = serialPort.SerialPort;
var SerialReceiver = require('../serialReceiverJSON');

var prefix = 'arduinoBlink_';
var baudRate = 115200;
var connection;
var messageParser;
var clients = [];
var listeners = {};
var initializationTime = 2000;

var mcuState = {
	light: 'on'
};

var write = function(msg) {
	if (!connection) {
		console.log('arduino blink is not connected to port');
		return;
	}

	connection.write(msg);
};

var broadcastState = function(msg) {
	if (_.has(mcuState, msg.event)) {
		mcuState[msg.event] = msg.data;

		_.each(clients, function(socket) {
			socket.emit(prefix + 'state', mcuState);
		});
	} else {
		_.each(clients, function(socket) {
			socket.emit('log', {
				message: prefix.replace('_', ': ') + msg
			});
		});
	}
};

var connected = function() {
	messageParser = new SerialReceiver(connection, function(msg) {
		broadcastState(msg);

		if (listeners[msg.event]) {
			listeners[msg.event](msg.data);
		}

	});
};


var connect = function(port, next) {
	if (connection && connection.isOpen()) {
		return next();
	}

	connection = new SerialPort(String(port), {
		baudRate: baudRate,
		parser: serialPort.parsers.readline(endLine)
	});

	connection.on('error', function() {
		console.log('Arduino could not be connected on port:', port);
	});

	connection.on('open', function(err) {
		//It seems the board takes a couple seconds to initialize after first connecting.
		//Only runs once on first connect.
		setTimeout(next, initializationTime);
		//next();
		connected();
	});

};

var blinkDuration = function(data) {
	if (Number(data) > 0) {
		var cmd = "blinkDuration";

		write(cmd + delimiter + data + '\n');
	}
	//throw
};

var isBlinking = function(data) {
	if (String(data) === 'on' || String(data) === 'off') {
		var cmd = "isBlinking";

		write(cmd + delimiter + data + '\n');
	}
	//throw
};

var sendRaw = function(data) {
	write(data + endLine);
};

var waitForLED = function(value, next) {
	var targetValue = String(value);
	listeners['light'] = null;

	//Am I in the right state?
	if (mcuState.light === String(targetValue)) {
		next(targetValue);
	} else {
		listeners['light'] = function(onOrOff) {
			if (onOrOff === targetValue) {
				listeners['light'] = null;
				next(onOrOff);
			}
		}
	}
};

var addClient = function(socket) {
	if (clients.indexOf(socket) < 0) {
		clients.push(socket);
		socket.on('disconnect', function() {
			clients = _.without(clients, [socket]);
		});
	}
};

var initApi = function(interpreter, scope, socket) {

	addClient(socket);

	interpreter.addApi(prefix + 'blinkDuration', blinkDuration);
	interpreter.addApi(prefix + 'isBlinking', isBlinking);
	interpreter.addApi(prefix + 'sendRaw', sendRaw);

	interpreter.setProperty(scope, prefix + 'waitForLED', interpreter.createAsyncFunction(waitForLED));
	interpreter.setProperty(scope, prefix + 'connect', interpreter.createAsyncFunction(connect));

};

module.exports = initApi;