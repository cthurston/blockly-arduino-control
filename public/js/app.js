'use strict';

angular.module('barcon', [
	'ngRoute',

	'barcon.services',
	'barcon.instructionBuilder',
	'boards',

	// 3rd party dependencies
	'btford.socket-io',
	'ngLodash'
]).config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
});
