angular.module('barcon.instructionBuilder').controller('BlocklyCtrl', [
	'$scope', '$http', 'Blockly', 'socket',
	function($scope, $http, Blockly, socket) {
		$scope.start = function() {
			$http.get('/blocks/toolbox.xml')
					.then(function(toolbox) {
						//We will store the workspace in the Blockly domain.
						Blockly.workspace = Blockly.inject('blocklyDiv',
								{
									comments: true,
									disable: true,
									collapse: true,
									grid: {
										spacing: 25,
										length: 3,
										colour: '#ccc',
										snap: true
									},
									media: '../media/',
									readOnly: false,
									realtime: false,
									scrollbars: true,
									toolbox: toolbox.data,
									zoom: {
										enabled: true,
										controls: true,
										wheel: true,
										maxScale: 2,
										minScale: .5,
										scaleSpeed: 1.1
									}
								});

						socket.on('highlightBlock', function(data) {
							Blockly.workspace.traceOn(true);
							Blockly.workspace.highlightBlock(Number(data.id));
						});
					});
		}
	}]);
