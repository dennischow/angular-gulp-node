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