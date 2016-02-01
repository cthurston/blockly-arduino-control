angular.module('barcon.instructionBuilder').controller('InstructionRunner', [
	'$scope', 'Blockly', 'socket',
	function($scope, Blockly, socket) {
		var sendMessage = function(command, data) {
			socket.emit(command, data || '');
		};

		$scope.stepDelay = 0;
		$scope.isRunning = false;
		$scope.isPaused = false;

		$scope.pause = function() {
			sendMessage('pause');
			$scope.isPaused = true;
		};

		$scope.resume = function() {
			sendMessage('resume');
			$scope.isPaused = false;
		};

		$scope.stop = function() {
			sendMessage('stop');
			$scope.isRunning = false;
		};

		var addJSPrefix = function() {
			Blockly.JavaScript.STATEMENT_PREFIX = 'stepDelay(' + $scope.stepDelay + ');\n';
			Blockly.JavaScript.addReservedWords('stepDelay');

			Blockly.JavaScript.STATEMENT_PREFIX += 'highlightBlock(%1);\n';
			Blockly.JavaScript.addReservedWords('highlightBlock');
		};

		$scope.submitCode = function() {
			addJSPrefix();

			var code = Blockly.JavaScript.workspaceToCode(Blockly.workspace);

			console.log('Ready to execute this code:\n' + code);

			sendMessage('runProtocol', code);

			$scope.isRunning = true;
			$scope.isPaused = false;

		};

		$scope.submitSingleBlock = function() {
			addJSPrefix();

			var code = Blockly.JavaScript.blockToCode(Blockly.selected);

			console.log('Send single block of code:\n' + code);

			sendMessage('runProtocol', code);

		};

		socket.on('finished', function(data) {
			$scope.runTime = data.runTime;
			$scope.runDuration = moment.duration(data.runTime).locale('precise-en').humanize();
			$scope.isRunning = false;
		});


	}]);

