var boards = [];

var arduinoBasic = new (require('./arduinoBasic'))();


boards.push(require('./utility'));
boards.push(require('./socketBlockly'));
boards.push(arduinoBasic);


//mcus.push(require('./samBlink'));

module.exports = boards;


