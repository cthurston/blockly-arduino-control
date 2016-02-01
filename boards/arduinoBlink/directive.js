angular.module('boards')
	.directive('arduinoBlink', ['lodash', 'socket', function(_, socket) {
		var name = 'arduinoBlink';

		return {
			restrict: 'E',
			scope: {},
			templateUrl: '/blocks/directive/template/' + name,
			controller: function($scope){

				socket.on(name + '_state', function(data) {
					_.extend($scope, data);
				});

			}
		}
	}]);