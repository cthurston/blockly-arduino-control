module.exports = {
	init: init
};

function init(master, scope, socket) {

	var highlightBlock = function(id) {
		//Must convert arguments explicitly to strings.
		socket.emit('highlightBlock', {id: String(id)});
	};

	master.addApi(global, 'highlightBlock', highlightBlock);

}