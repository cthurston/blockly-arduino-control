Blockly.Blocks['arduinoBlink_connect'] = {
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

Blockly.JavaScript['arduinoBlink_connect'] = function(block) {
	var value_port = Blockly.JavaScript.valueToCode(block, 'port', Blockly.JavaScript.ORDER_ATOMIC);
	var code = 'arduinoBlink_connect(' + value_port + ');\n';
	code += 'log("Arduino Blink connect on port: ",' + value_port + ');';
	return code + '\n';
};

Blockly.Blocks['arduinoBlink_rawCommand'] = {
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

Blockly.JavaScript['arduinoBlink_rawCommand'] = function(block) {
	var value_rawcommand = Blockly.JavaScript.valueToCode(block, 'rawCommand', Blockly.JavaScript.ORDER_ATOMIC);
	var code = 'arduinoBlink_sendRaw(' + value_rawcommand + ');\n';
	code += 'log("arduino blink raw command: ",' + value_rawcommand + ');';
	return code + '\n';
};

Blockly.Blocks['arduinoBlink_blinkDuration'] = {
	init: function() {
		this.appendDummyInput()
			.appendField('Arduino Blink')
			.appendField(new Blockly.FieldImage("/img/clock-icon.png", 20, 20, ""));
		this.appendValueInput('duration')
			.setCheck('Number')
			.appendField('duration');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(20);
		this.setTooltip('');
		this.setHelpUrl('');
	}
};

Blockly.JavaScript['arduinoBlink_blinkDuration'] = function(block) {
	var value_duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);
	var code = 'arduinoBlink_blinkDuration(' + value_duration + ');\n';
	code += 'log("blink duration: ",' + value_duration + ');';
	return code + '\n';
};


Blockly.Blocks['arduinoBlink_isBlinking'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Arduino Blink")
			.appendField(new Blockly.FieldImage("/img/blue-led-icon.png", 15, 15, ""))
			.appendField("isBlinking")
			.appendField(new Blockly.FieldDropdown([["On", "on"], ["Off", "off"]]), "blink");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(20);
		this.setTooltip('');
		this.setHelpUrl('');
	}
};

Blockly.JavaScript['arduinoBlink_isBlinking'] = function(block) {
	var value_blink = block.getFieldValue('blink');
	var code = 'arduinoBlink_isBlinking("' + value_blink + '");\n';
	code += 'log("isBlinking: ","' + value_blink + '");';
	return code;
};

Blockly.Blocks['arduinoBlink_waitForLed'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Arduino Blink")
			.appendField(new Blockly.FieldImage("/img/blue-led-icon.png", 15, 15, ""))
			.appendField("wait for LED")
			.appendField(new Blockly.FieldDropdown([["On", "on"], ["Off", "off"]]), "blink");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(20);
		this.setTooltip('');
		this.setHelpUrl('');
	}
};

Blockly.JavaScript['arduinoBlink_waitForLed'] = function(block) {
	var value_blink = block.getFieldValue('blink');
	var code = 'arduinoBlink_waitForLED("' + value_blink + '");\n';
	return code;
};
