


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













// Home Controller
webApp
	.controller("homeController", ['$rootScope', '$scope', 'appCtrl', function($rootScope, $scope, appCtrl) {

		$rootScope.title = 'Home'
		$rootScope.pageClass = 'page-home';

	}]);

// Blog Controller
webApp
	.controller("blogController", ['$rootScope', '$scope', 'appCtrl', 'API', 'Pagination', function($rootScope, $scope, appCtrl, API, Pagination) {

		$rootScope.title = 'Blog';
		$rootScope.pageClass = 'page-blog';

		console.time('blogData');
		console.log('API.getBlogData() Requesting');

		API.getBlogData().then(function(res){

			// console.log( res );

			// Check if http request from Servive success
			if( res.status !== 200 ){
				console.error('API.getBlogData() Fail');
				console.timeEnd('blogData');
				return false;
			}

			// Assign returned data to $scope, so viewBlog.html can re-peat the data
			$scope.posts = res.data;
			console.log('API.getBlogData() Success');
			console.timeEnd('blogData');

			fn_pager();

		});

		// Pagination Function
		var fn_pager = function(){
			var eachPageHas = 10;
			// Plguin - https://github.com/svileng/ng-simplePagination
			// More Options - http://www.yearofmoo.com/2012/10/more-angularjs-magic-to-supercharge-your-webapp.html
			$scope.pagination = Pagination.getNew( eachPageHas );
			$scope.pagination.numPages = Math.ceil( $scope.posts.length / $scope.pagination.perPage );
			// console.log( $scope.pagination.numPages );			
		}

		// Reference - http://stackoverflow.com/questions/16813945/how-to-add-many-functions-in-one-ng-click
		// Scroll to top, extra function for paingation button
		// $scope.scrollToTop = function(){
		// 	window.scrollTo(0,0);		
		// }

		$scope.nextPage = function(){
			$scope.pagination.nextPage();
			appCtrl.scrollToTop(); // Services Function

			console.log( $scope.pagination );
		}

		$scope.prevPage = function(){
			$scope.pagination.prevPage();	
			appCtrl.scrollToTop(); // Services Function
		}

	}]);


// Blog Details Controller
webApp
	.controller("blogDetailsController", ['$rootScope', '$scope', '$routeParams', 'appCtrl', 'API', function($rootScope, $scope, $routeParams, appCtrl, API) {

		// Required - https://docs.angularjs.org/api/ngSanitize/service/$sanitize

		$rootScope.title = 'Blog Details';
		$rootScope.pageClass = 'page-blog page-blog-details';

		console.time('blogData');
		console.log('API.getBlogData() Requesting');

		API.getBlogData().then(function(res){

			// Check if http request from Servive success
			if( res.status !== 200 ){
				console.error('API.getBlogData() Fail');
				console.timeEnd('blogData');
				return false;
			}

			// Variables
			$scope.posts = res.data;
			var postID = $routeParams.id; // post ID come from the url 
			$scope.post = null;

			// Select Post Entry by Para ID
			function selectPostEntry(){
				for(var i = 0, len = $scope.posts.length; i < len; i++){
					if( $scope.posts[i].entry_id === parseInt( postID ) ){
						$scope.post = $scope.posts[i];
						break;
					}
				}
				console.log( 'selectPostEntry()' );
				console.log( $scope.post );
			}

			console.log('API.getBlogData() Success');
			console.timeEnd('blogData');

			selectPostEntry();

		});

	}]);


// Instagram Controller
webApp
	.controller("instagramController", ['$rootScope', '$scope', 'appCtrl', 'API','Pagination', function($rootScope, $scope, appCtrl, API, Pagination) {

		$rootScope.title = 'Instagram';
		$rootScope.pageClass = 'page-instagram';

		console.time('blogData');
		console.log('API.getInstagramData() Requesting');

		API.getInstagramData().then(function(res){

			// console.log( res );

			// Check if http request from Servive success
			if( res.status !== 200 ){
				console.error('API.getInstagramData() Fail');
				console.timeEnd('blogData');
				return false;
			}

			// Assign returned data to $scope, so viewBlog.html can re-peat the data
			$scope.posts = res.data;
			console.log( $scope.posts );
			console.log('API.getInstagramData() Success');
			console.timeEnd('blogData');

			fn_pager();

		});


		// Pagination Function
		var fn_pager = function(){
			var eachPageHas = 12;
			// Plguin - https://github.com/svileng/ng-simplePagination
			// More Options - http://www.yearofmoo.com/2012/10/more-angularjs-magic-to-supercharge-your-webapp.html
			$scope.pagination = Pagination.getNew( eachPageHas );
			$scope.pagination.numPages = Math.ceil( $scope.posts.length / $scope.pagination.perPage );
			// console.log( $scope.pagination.numPages );			
		}

		// Reference - http://stackoverflow.com/questions/16813945/how-to-add-many-functions-in-one-ng-click
		// Scroll to top, extra function for paingation button
		// $scope.scrollToTop = function(){
		// 	window.scrollTo(0,0);			
		// }

		$scope.nextPage = function(){
			$scope.pagination.nextPage();
			appCtrl.scrollToTop(); // Services Function
		}

		$scope.prevPage = function(){
			$scope.pagination.prevPage();	
			appCtrl.scrollToTop(); // Services Function
		}

	}]);


// Global Function 

// Back Button
webApp
	.directive('backButton', function(){
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('click', function () {
					history.back();
					scope.$apply();
				});
			}
		}
	});


// Main Navigation
webApp
	.directive('siteNavigation', function() {
		return {
			restrict: 'A',
			scope: {
				hoverClass:'@'
			},
			link: function(scope, element, attrs){

				console.log( 'site-navigation has Directive' );

			}
		}
	});


var API_path = 'app/data/';


// API Services
webApp
	.service('API', function($http){

		var _this = {}; // _this means entire API service

		// Get Blog Data
		_this.getBlogData = function(){
			// blogData.json
			return $http.get( API_path + 'blog.json' );
		}

		// Get Instagram Data
		_this.getInstagramData = function(){
			// blogData.json
			return $http.get( API_path + 'instagram.json' );
		}

		return _this;

	});



// App Global Controls
webApp
	.service('appCtrl', function(){

		var _this = {}; // _this means entire App Control service

		_this.scrollToTop = function(){
			window.scrollTo(0,0);
			console.log( 'appCtrl.scrollToTop()' );
		}

		return _this;
		
	});
