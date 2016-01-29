var chai = require('chai');
var spies = require('chai-spies');

chai.use(spies);

var expect = require('chai').expect;

var BracketsProtocol = require('../BracketsProtocol');

var mockSerialPort = {
	write: function(){},
	on: function(){}
};

describe('BracketsProtocol', function() {
	describe('write', function() {
		var brackets;
		beforeEach(function(){
			brackets = new BracketsProtocol(mockSerialPort);
		});

		it('should throw an error if arguments with reserved characters are sent', function() {
			var space = function() {
				brackets.write('my command');
			};
			var open = function() {
				brackets.write('m[n');
			};
			var close = function() {
				brackets.write('m]n');
			};

			expect(space).to.throw(Error);
			expect(open).to.throw(Error);
			expect(close).to.throw(Error);
		});

		it('should create a packet with [] and spaces', function() {
			var packet1 = brackets.write('MyCommand');
			var packet2 = brackets.write('MyCommand', 45);
			var packet3 = brackets.write('MyCommand', 45, 3.4);
			var packet4 = brackets.write('MyCommand', 45, 3.4, 'testing');

			expect(packet1).to.equal('[MyCommand]');
			expect(packet2).to.equal('[MyCommand 45]');
			expect(packet3).to.equal('[MyCommand 45 3.4]');
			expect(packet4).to.equal('[MyCommand 45 3.4 testing]');
		});
	});

	describe('receiveData', function() {
		var brackets;
		var next;
		beforeEach(function(){
			next = chai.spy();
			brackets = new BracketsProtocol(mockSerialPort, next);
		});

		it('should throw if receive data before an opening', function() {
			var noOpen = function() {
				brackets.receiveData('nasdbfja');
			};

			expect(noOpen).to.throw(Error);
		});

		it('should throw if receive a second opening before a close', function() {
			var noClose = function() {
				brackets.receiveData('[arg1 arg2');
				brackets.receiveData('[arg3 arg4');
			};

			expect(noClose).to.throw(Error);
		});

		it('should call callback with arguments on close of bracket', function(){
			brackets.receiveData('[arg1');
			brackets.receiveData(']');

			expect(next).to.have.been.called.once;
			expect(next).to.have.been.called.with('arg1');
		});

		it('should call callback with multiple arguments on close of bracket', function(){
			brackets.receiveData('[arg1 arg2');
			brackets.receiveData(' 4.5');
			brackets.receiveData(']');

			expect(next).to.have.been.called.once;
			expect(next).to.have.been.called.with('arg1', 'arg2', '4.5');
		});

		it('should call callback with each valid packet in the data', function(){
			brackets.receiveData('[arg1][arg2 stuff 4.5]');

			expect(next).to.have.been.called.twice;
		});

	});

});


function ABoard(){
	Board.call(this);
	Prot.call(this);
}

function Board(){
	this.conn = 'hey';
}

function Prot(){
	if(!this.conn) throw new Error('HEYYYYYYYYYYYYYYYYY');
	this.write = function(){
		return this.conn;
	}
}

var inh = require('util').inherits;
inh(ABoard, Board);
inh(ABoard, Prot);



describe('junk this', function(){
	it('should inherit', function(){
		var b = new ABoard();

		expect(b.write()).to.equal('hey');


	});
});

describe('manipulate arguments', function(){
	it('should manipulate', function(){

		var two = function(a){
			console.log(arguments[0], a);
		};
		var one = function(){
			arguments[0] = 'hey';
			two.apply(null, arguments);
		};

		one('not hey');

		//expect(true).to.be(false);
	});
});