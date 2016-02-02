Blockly.Blocks['arduinoBasic_connect'] = {
	init: function() {
		this.appendDummyInput()
			.appendField('Arduino Blink');
		this.appendValueInput('port')
			.setCheck('com_port')
			.appendField('connect on port');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(20);
		this.setTooltip('');
		this.setHelpUrl('');
	}
};

Blockly.JavaScript['arduinoBasic_connect'] = function(block) {
	var value_port = Blockly.JavaScript.valueToCode(block, 'port', Blockly.JavaScript.ORDER_ATOMIC);
	var code = 'arduinoBasic_connect(' + value_port + ');\n';
	code += 'log("Arduino Basic connect on port: ",' + value_port + ');';
	return code + '\n';
};

Blockly.Blocks['arduinoBasic_rawCommand'] = {
	init: function() {
		this.appendValueInput("rawCommand")
			.setCheck("String")
			.appendField("Arduino Blink")
			.appendField("raw command");
		this.setInputsInline(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(20);
		this.setTooltip('This will send a raw command to the board.');
		this.setHelpUrl('');
	}
};

Blockly.JavaScript['arduinoBasic_rawCommand'] = function(block) {
	var value_rawcommand = Blockly.JavaScript.valueToCode(block, 'rawCommand', Blockly.JavaScript.ORDER_ATOMIC);
	var code = 'arduinoBasic_rawCommand(' + value_rawcommand + ');\n';
	code += 'log("arduino blink raw command: ",' + value_rawcommand + ');\n';
	return code;
};

Blockly.Blocks['arduinoBasic_echoAfter'] = {
	init: function() {
		this.appendValueInput("delay")
				.setCheck("Number")
				.appendField("echo after");
		this.appendDummyInput()
				.appendField("ms");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(135);
		this.setTooltip('This will echo a response from the board after number of milliseconds.');
		this.setHelpUrl('');
	}
};


Blockly.JavaScript['arduinoBasic_echoAfter'] = function(block) {
	var value_delay = Blockly.JavaScript.valueToCode(block, 'delay', Blockly.JavaScript.ORDER_ATOMIC);
	var code = 'arduinoBasic_echoAfter(' + value_delay + ');';
	return code + '\n';
};



Blockly.Blocks['arduinoBasic_setPin'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("Arduino Basic")
				//.appendField(new Blockly.FieldImage("/images/blue-led-icon.png", 15, 15, ""))
				.appendField(" set pin")
				.appendField(new Blockly.FieldDropdown([["Pin 13", "13"], ["Pin 12", "12"],["Pin 11", "11"],["Pin 10", "10"],["Pin 9", "9"],["Pin 8", "8"]]), "pin")
				.appendField(new Blockly.FieldDropdown([["On", "1"], ["Off", "0"]]), "voltage");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(20);
		this.setTooltip('');
		this.setHelpUrl('');
	}
};

Blockly.JavaScript['arduinoBasic_setPin'] = function(block) {
	var pin = block.getFieldValue('pin');
	var voltage = block.getFieldValue('voltage');
	var code = 'arduinoBasic_setPin("' + pin + '", "' + voltage + '");\n';
	code += 'log("setPin: ","' + voltage + '");\n';
	return code;
};