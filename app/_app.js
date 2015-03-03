console.log('app.js Connected');

var webApp = angular.module('webApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'simplePagination']);

var viewsPath = 'app/components/views/';


// Route Config
webApp
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/home/', {
				templateUrl: viewsPath + 'home/viewHome.html',
				controller: 'homeController'
				// controllerAs: 'book'
			})
			.when('/blog/', {
				templateUrl: viewsPath + 'blog/viewBlog.html',
				controller: 'blogController'
				// controllerAs: 'chapter'
			})
			.when('/blog/:id', {
				templateUrl: viewsPath + 'blog/viewBlog-details.html',
				controller: 'blogDetailsController'
				// controllerAs: 'chapter'
			})
			.when('/instagram/', {
				templateUrl: viewsPath + 'instagram/viewInstagram.html',
				controller: 'instagramController'
				// controllerAs: 'chapter'
			})
			.otherwise({
				redirectTo: '/home/'
			});

		// $locationProvider.html5Mode(true);
	}]);


// Initialize 
webApp
	.run(['$rootScope', function($rootScope){

		// Root Scope is a global variable
		$rootScope.title = '';
		$rootScope.pageClass = '';

	}]);


