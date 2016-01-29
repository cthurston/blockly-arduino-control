var _ = require('lodash');
var JSInterpreter = require('./js-interpreter');
var boards = require('../boards');

//This is the callback to a socket connect.
module.exports = function(socket) {

	var master = new Master(socket);

	socket.on('runProtocol', master.runProtocol.bind(master));
	socket.on('pause', master.pause.bind(master));
	socket.on('resume', master.resume.bind(master));
	socket.on('stop', master.stop.bind(master));

};


function Master(socket) {

	var codeInterpreter = {};
	var pausedByUser = false;
	var waitTimeAtPause = 0;
	var metrics = {
		startTime: 0
	};

	var initApi = function(interpreter, interpreterScope) {
		//This could be prototyped on the JSInterpreter, but I can't figure out how to get scope in, so using it in a closure.
		interpreter.addApi = function(board, name, fn) {
			var prefix = board.prefix || '';
			var wrapper = function() {
				return interpreter.createPrimitive(fn.apply(board, arguments));
			};
			interpreter.setProperty(interpreterScope, prefix + name, interpreter.createNativeFunction(wrapper));
		};

		interpreter.addWaitApi = function(board, name, fn) {
			var prefix = board.prefix || '';
			interpreter.setProperty(interpreterScope, prefix + name, interpreter.createAsyncFunction(fn.bind(board)));
		};

		//Hook the api of each board.  Needs socket closure
		_.each(boards, function(board) {
			board(interpreter, interpreterScope, socket);
		});
	};

	this.pause = function() {
		pausedByUser = true;

		//Most likely paused during a timeout
		waitTimeAtPause = 0;
		if (codeInterpreter.waitDelay) {
			waitTimeAtPause = codeInterpreter.waitDelay - (Date.now() - codeInterpreter.waitTimeBegin);
		}
	};

	this.resume = function() {
		pausedByUser = false;
		if (!codeInterpreter.takeNextStep) {
			return;
		}

		setTimeout(codeInterpreter.takeNextStep, waitTimeAtPause);
		codeInterpreter.setDelayMetrics(waitTimeAtPause);
	};

	this.stop = function() {
		if (!codeInterpreter.takeNextStep) {
			return;
		}
		codeInterpreter.paused_ = true;
		clearTimeout(codeInterpreter.waitTimeout);
		this.runProtocol('log("stopped by user");highlightBlock(null);');
	};

	this.runProtocol = function(code) {
		pausedByUser = false;

		try {
			codeInterpreter = new JSInterpreter(code, initApi);
		} catch (err) {
			socket.emit('finished', {
				runTime: Date.now() - metrics.startTime
			});
			socket.emit('protocol_error', {
				message: 'Could not parse the commands sent.  Are you missing a variable?'
			});
			return;
		}

		codeInterpreter.setDelayMetrics = function(delay) {
			codeInterpreter.waitTimeBegin = Date.now();
			codeInterpreter.waitDelay = delay + 0;  //Interpreter wraps so +0 casts to number.
		};

		//This may be redundant.  But couldn't get run to work with queue and wait.
		codeInterpreter.takeNextStep = function() {
			var isErr;
			try {
				var ok = codeInterpreter.step();
			} catch (err) {
				isErr = err;
				socket.emit('protocol_error', {
					message: err
				});

				console.warn('Error while running protocol: ', err);
			}

			if (!ok || isErr) {
				socket.emit('finished', {
					runTime: Date.now() - metrics.startTime
				});
				return;
			}

			if (pausedByUser) {
				//Do nothing...
			} else if (codeInterpreter.paused_) {
				codeInterpreter.paused_ = false;
			} else {
				codeInterpreter.takeNextStep();
			}
		};

		metrics.startTime = Date.now();
		codeInterpreter.takeNextStep();
		//codeInterpreter.run();  //this isn't working with my queue and wait stuff.
	};


}