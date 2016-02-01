var express = require('express');
var router = express.Router();

var serialport = require('serialport');

router.get('/comports', function(req, res) {
	serialport.list(function(err, ports) {
		res.send(ports);
	});
});

router.get('/media', function(req, res) {
	serialport.list(function(err, ports) {
		res.send(ports);
	});
});

module.exports = router;