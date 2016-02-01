angular.module('barcon.instructionBuilder').controller('InstructionCodeViewer', [
	'$scope', 'Blockly',
	function($scope, Blockly) {
		$scope.toCode = function() {
			Blockly.JavaScript.STATEMENT_PREFIX = '';
			$scope.code = Blockly.JavaScript.workspaceToCode(Blockly.workspace);
		};
	}]);
