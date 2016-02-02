angular.module('barcon.instructionBuilder').controller('InstructionSaveAndLoad', [
	'$scope', '$http', 'Blockly',
	function($scope, $http, Blockly) {
		$scope.instructionName = '';
		$scope.savedInstructions = [];

		$scope.save = function() {
			if (!$scope.instructionName.length) {
				$scope.instructionName = 'new';
			}

			$http.post('/instruction', {
				name: $scope.instructionName,
				xml: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.workspace))
			}).then(function() {
				$scope.loadSavedInstructions();
			});
		};

		$scope.remove = function(name) {
			$http.delete('/instruction/' + name)
				.then(function(res) {
					$scope.loadSavedInstructions();
				});
		};

		$scope.load = function(name) {
			$http.get('/instruction/' + name)
				.then(function(res) {

					var xml = Blockly.Xml.textToDom(res.data);
					Blockly.Xml.domToWorkspace(Blockly.workspace, xml);

				});
		};

		$scope.loadSavedInstructions = function() {
			$http.get('/instruction')
				.then(function(res) {
					$scope.savedInstructions = res.data.instructions;
				});
		};

	}]);

