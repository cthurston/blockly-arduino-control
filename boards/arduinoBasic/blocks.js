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
	var code = 'arduinoBasic_sendRaw(' + value_rawcommand + ');\n';
	code += 'log("arduino blink raw command: ",' + value_rawcommand + ');';
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
	code += 'log("setPin: ","' + voltage + '");';
	return code;
};



Blockly.Blocks['arduinoBasic_blinkDuration'] = {
	init: function() {
		this.appendDummyInput()
			.appendField('Arduino Blink')
			.appendField(new Blockly.FieldImage("/images/clock-icon.png", 20, 20, ""));
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

Blockly.JavaScript['arduinoBasic_blinkDuration'] = function(block) {
	var value_duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);
	var code = 'arduinoBasic_blinkDuration(' + value_duration + ');\n';
	code += 'log("blink duration: ",' + value_duration + ');';
	return code + '\n';
};


Blockly.Blocks['arduinoBasic_isBlinking'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Arduino Blink")
			.appendField(new Blockly.FieldImage("/images/blue-led-icon.png", 15, 15, ""))
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

Blockly.JavaScript['arduinoBasic_isBlinking'] = function(block) {
	var value_blink = block.getFieldValue('blink');
	var code = 'arduinoBasic_isBlinking("' + value_blink + '");\n';
	code += 'log("isBlinking: ","' + value_blink + '");';
	return code;
};

Blockly.Blocks['arduinoBasic_waitForLed'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Arduino Blink")
			.appendField(new Blockly.FieldImage("/images/blue-led-icon.png", 15, 15, ""))
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

Blockly.JavaScript['arduinoBasic_waitForLed'] = function(block) {
	var value_blink = block.getFieldValue('blink');
	var code = 'arduinoBasic_waitForLED("' + value_blink + '");\n';
	return code;
};
