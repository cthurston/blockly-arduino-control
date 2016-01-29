'use strict';

angular.module('cthurston-barcon', [
	'ngRoute',

	'app.filters',
	'app.services',
	'app.directives',

	'app.protocolBuilder',
	'mcus',

	// 3rd party dependencies
	'btford.socket-io',
	'ngLodash'
]).
	config(function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
	});
