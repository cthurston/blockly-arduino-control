var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {
	var loadPath = path.join(__dirname, '../db/instruction');
	fs.readdir(loadPath, function(err, files) {
		if (err) {
			return res.status(500).send(err);
		}
		res.send({
			instructions: files
		});
	});
});

router.get('/:name', function(req, res, next) {
	var name = req.params.name;
	var loadPath = path.join(__dirname, '../db/instruction', name);
	res.sendFile(loadPath);
});


router.route('/:name')
		.post(function(req, res, next) {
			var name = req.body.name;
			var xml = req.body.xml;
			var savePath = path.join(__dirname, '../db/instruction', name);
			ensureExists(path.join(__dirname, '../db/instruction'), function(err) {
				if (err) {
					// handle folder creation error
					res.status(500).send(err);
				} else {
					fs.writeFile(savePath, xml, function(err) {
						if (err) {
							res.status(500).send(err);
						}
						res.send({
							success: 1,
							name: name
						});
					});
				}
			});
		})
		.delete(function(req, res, next) {
			var name = req.params.name;
			var savePath = path.join(__dirname, '../db/instruction', name);
			fs.unlink(savePath, function(err) {
				if (err) {
					res.status(500).send(err);
				}
				res.send({
					success: 1,
					name: name
				});
			});
		});


module.exports = router;


function ensureExists(path, mask, cb) {
	if (typeof mask == 'function') { // allow the `mask` parameter to be optional
		cb = mask;
		mask = 0777;
	}
	fs.mkdir(path, mask, function(err) {
		if (err) {
			if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
			else cb(err); // something else went wrong
		} else cb(null); // successfully created folder
	});
}

exports.listSerialPorts = function(req, res) {
	require('serialport').list(function(err, ports) {
		res.send(ports);
	});
};


