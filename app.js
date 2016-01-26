/**
 * Module dependencies
 */
var express = require('express');
var http = require('http');
var path = require('path');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/**
 * Configuration
 */
// all environments
app.set('port', process.env.PORT || 5441);

app.engine('ejs', require('ejs').renderFile);
app.set('views', __dirname);
//app.use(express.logger('dev'));

var serveStatic = require('serve-static');
app.use(serveStatic(path.join(__dirname, 'public')));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// development only
if (app.get('env') === 'development') {
	var errorHandler = require('errorhandler');
	app.use(errorHandler());
}

// production only
if (app.get('env') === 'production') {
	// TODO
}

/**
 * Routes
 */
var router = express.Router();


//router.get('/serialPorts', routes.listSerialPorts);
//
//router.get('/blocks', routes.blocks);
//router.get('/blockDirectives', routes.blockDirectives);
//router.get('/blockDirectiveTemplate/:name', routes.blockDirectiveName);
//router.get('/comPort_blocks', routes.comPortBlocks);
//router.get('/blockToolbox', routes.blockToolbox);
//router.get('/blockToolbox.xml', routes.blockToolbox);
//
//router.get('/protocol', routes.loadProtocolNames);
//router.get('/protocol/:name', routes.loadProtocol);
//router.post('/protocol', routes.saveProtocol);
//router.delete('/protocol/:name', routes.removeProtocol);

router.get('*', function(req, res) {
	res.status(404).send(new Error('Not Found'));
});


/**
 * Attach the blockly code interpreter.
 */
//var interpreterSocketConnect = require('./modules/interpreter');
//io.sockets.on('connection', interpreterSocketConnect);

/**
 * Start Server
 */
server.listen(app.get('port'), function() {
	console.log('Protocol Builder service is running.\n\nTo start go to http://localhost:' + app.get('port'));
});



