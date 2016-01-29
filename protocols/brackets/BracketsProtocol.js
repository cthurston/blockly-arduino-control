/**
 * Protocol that uses [ and ] to encapsulate packages that are space delimited.
 **/
var EventEmitter = require('events');
var inherits = require('util').inherits;

module.exports = BracketsProtocol;

var delimiter = ' ';
var open = '[';
var close = ']';

function BracketsProtocol() {
	EventEmitter.call(this);

	var currentBuffer = '';

	this.receiveData = function(data) {
		var indexOfClose;
		var args;

		validateIncomingPacket(currentBuffer, data);

		//Look for end
		indexOfClose = data.indexOf(close);
		if (indexOfClose === -1) {
			currentBuffer += data;
		} else {
			currentBuffer += data.substring(0, indexOfClose + 1);
			args = fromPacket(currentBuffer);

			this.emit('receivedPacket', args);

			currentBuffer = '';
			this.receiveData(data.substring(indexOfClose + 1));
		}
	};

	this.toPacket = function() {
		var args = Array.prototype.slice.call(arguments);
		var packet = open + args.join(delimiter) + close;
		validatePacket(packet, args);
		return packet;
	}

}

inherits(BracketsProtocol, EventEmitter);

function fromPacket(packet) {
	packet = packet.substring(1, packet.length - 1);
	return packet.split(delimiter);
}

function validateIncomingPacket(currentBuffer, data) {
	if (!data.length) {
		return;
	} else if (currentBuffer.length === 0 && data[0] !== open) {
		throw new Error('Received data outside an opening bracket: ' + data);
	} else if (currentBuffer.length && countOccurrence(data, close) === 0 && countOccurrence(data, open) > 0) {
		throw new Error('Received opening of packet before close of last: ' + currentBuffer + ' then ' + data);
	}
}

function validatePacket(packet, args) {
	var checkDelimiter = countOccurrence(packet, delimiter) === args.length - 1;
	var checkOpen = countOccurrence(packet, open) === 1;
	var checkClose = countOccurrence(packet, close) === 1;
	if (!checkDelimiter || !checkOpen || !checkClose) {
		throw new Error('Invalid packet arguments. According to the brackets protocol space, [, and ] reserved.');
	}
}

function countOccurrence(str, char) {
	var len = str.length;
	var count = 0;
	var i = 0;
	while (i < len) {
		if (char === str[i++]) {
			count++;
		}
	}
	return count;
}

