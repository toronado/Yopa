'use strict';

/**
 * @ngdoc overview
 * @name yopaApp
 * @description
 * # yopaApp
 *
 * Main module of the application.
 */
var yopaApp = angular.module('yopaApp', [
		'ngRoute'
	]);

yopaApp.config(function ($routeProvider) {
    $routeProvider
        .when('/overview/', {
            templateUrl: 'views/overview.html',
            controller: 'MainCtrl'
        })
        .when('/read/', {
            templateUrl: 'views/read.html',
            controller: 'MainCtrl'
        })
        .when('/create/', {
            templateUrl: 'views/create.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        });
});
