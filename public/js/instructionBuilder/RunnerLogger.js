angular.module('barcon.instructionBuilder').controller('RunnerLogger', [
	'$scope', 'socket',
	function($scope, socket) {
		$scope.log = [];
		$scope.errorMessages = [];

		$scope.clear = function() {
			$scope.log = [];
		};

		$scope.removeError = function(index) {
			$scope.errorMessages.splice(index, 1);
		};

		socket.on('log', function(data) {
			data.time = new Date();
			$scope.log.unshift(data);
			if ($scope.log.length > 200) {
				$scope.log.pop();
			}
		});

		socket.on('protocol_error', function(data) {
			$scope.errorMessages.push(data);
		});

	}]);

