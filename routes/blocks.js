var express = require('express');
var router = express.Router();

var fs = require('fs');
var glob = require('glob');
var async = require('async');
var path = require('path');

router.get('/', function(req, res, next) {
	glob('/boards/**/blocks.js', {root: path.join(__dirname, '../')}, function(err, files) {
		async.map(files, fs.readFile, function(err, results) {
			res.send(results.join('\n'));
		})
	});
});

router.get('/directive', function(req, res, next) {
	glob('/boards/**/directive.js', {root: path.join(__dirname, '../')}, function(err, files) {
		async.map(files, fs.readFile, function(err, results) {
			res.send(results.join('\n'));
		});
	});
});

router.get('/directive/template/:name', function(req, res, next) {
	var loadPath = path.join(__dirname, '../boards', req.params.name, 'template.html');
	res.sendFile(loadPath);
});

router.get('/toolbox.xml', function(req, res, next) {
	glob('/boards/**/toolbox.xml', {root: path.join(__dirname, '../')}, function(err, files) {
		async.map(files, readFileUTF8, function(err, boardToolboxes) {
			res.type('.xml').render('boards/toolbox.ejs', {boardToolboxes: boardToolboxes});
		});
	});
});

router.get('/com_ports', function(req, res, next) {
	require('serialport').list(function(err, ports) {
		res.type('.js').render('boards/utility/comport_blocks.ejs', {ports: ports});
	});
});


module.exports = router;


function readFileUTF8(file, next) {
	fs.readFile(file, 'utf8', next);
}