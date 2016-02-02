var _ = require('lodash');
var inherits = require('util').inherits;
var Board = require('../Board');

module.exports = ArduinoBasic;

function ArduinoBasic(options) {
	Board.call(this);

	options = options || {};

	this.prefix = options.prefix || 'arduinoBasic_';
	this.name = options.name || 'Arduino Basic';


}

inherits(ArduinoBasic, Board);

ArduinoBasic.prototype.init = function(master, scope, socket) {
	this.addClient(socket);

	master.addApi(this, 'rawCommand', this.rawCommand);
	master.addApi(this, 'setPin', this.setPin);

	master.addWaitApi(this, 'echoAfter', this.echoAfter);

	master.setProperty(scope, this.prefix + 'connect', master.createAsyncFunction(this.connect));
};

ArduinoBasic.prototype.setPin = function(pin, value) {
	var cmd = 3;
	this.runCommand(cmd, pin, value);
};

ArduinoBasic.prototype.echoAfter = function(delay, next) {
	var cmd = 1;
	this.runCommandAndWait(cmd, delay, next);
};