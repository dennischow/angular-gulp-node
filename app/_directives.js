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
