angular.module('barcon.services', []).factory('socket', function(socketFactory) {
			return socketFactory();
		})
		.factory('Blockly', function() {
			return Blockly;
		});