angular.module('barcon.instructionBuilder').controller('InstructionSaveAndLoad', [
	'$scope', '$http', 'Blockly',
	function($scope, $http, Blockly) {
		$scope.protocolName = '';
		$scope.savedProtocols = [];
		$scope.save = function() {
			if (!$scope.protocolName.length) {
				$scope.protocolName = 'new';
			}

			$http.post('/protocol', {
				name: $scope.protocolName,
				xml: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.workspace))
			}).then(function() {
				$scope.loadSavedProtocols();
			});
		};
		$scope.remove = function(name) {
			$http.delete('/protocol/' + name)
					.then(function(res) {
						$scope.loadSavedProtocols();
					});
		};

		$scope.load = function(name) {
			$http.get('/protocol/' + name)
					.then(function(res) {

						var xml = Blockly.Xml.textToDom(res.data);
						Blockly.Xml.domToWorkspace(Blockly.workspace, xml);

					});
		};

		$scope.loadSavedProtocols = function() {
			$http.get('/protocol')
					.then(function(res) {
						$scope.savedProtocols = res.data.protocols;
					});
		};
	}]);

