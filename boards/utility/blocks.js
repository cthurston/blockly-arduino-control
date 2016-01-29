Blockly.Blocks['wait'] = {
	init: function() {
		this.appendValueInput("delay")
			.setCheck("Number")
			.appendField("wait");
		this.appendDummyInput()
			.appendField("ms");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(135);
		this.setTooltip('This will pause the script for x number of milliseconds.');
		this.setHelpUrl('');
	}
};


Blockly.JavaScript['wait'] = function(block) {
	var value_delay = Blockly.JavaScript.valueToCode(block, 'delay', Blockly.JavaScript.ORDER_ATOMIC);
	var code = 'wait(' + value_delay + ');';
	return code + '\n';
};