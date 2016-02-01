var _ = require('lodash');

module.exports = {
	init: init
};

function init(interpreter, scope, socket) {

	var logWrapper = function() {
		var printList = _.map(arguments, function(a) {
			return String(a);
		});
		//Log on the client as well.
		socket.emit('log', {message: printList.join(' ')});

		return interpreter.createPrimitive(console.log.apply(console, printList));
	};

	interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(logWrapper));
	interpreter.setProperty(scope, 'log', interpreter.createNativeFunction(logWrapper));
	interpreter.setProperty(scope, 'print', interpreter.createNativeFunction(logWrapper));


	var wait = function(delay) {
		interpreter.paused_ = true;
		interpreter.waitTimeout = setTimeout(interpreter.takeNextStep, delay);

		interpreter.setDelayMetrics(delay);
	};

	interpreter.addApi(global, 'wait', wait);
	interpreter.addApi(global, 'stepDelay', wait);

}