'use strict';

/* Directives */


var myBoiseStateDirectives = angular.module('myBoiseState.directives', []);

myBoiseStateDirectives.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

myBoiseStateDirectives.directive('navbarResponsive', function() {
    return {
        restrict: 'A',
        transclude: true,
        controller: 'MainNavController',
        scope: { title: '@' },
        templateUrl: 'partials/main-nav.html',
        replace: true
    };
});

myBoiseStateDirectives.directive('parallax', ['$window', function ($window) {
    return function(scope, element, attrs) {
        var jumbo = element[0];
        //var jumbo = element;
        angular.element($window).on('scroll', function() {
            // console.log($window.pageYOffset);
             if (this.pageYOffset >= 0) {
                jumbo.style.webkitTransform = 'translate3d(0px, '+ $window.pageYOffset / 3 +'px, 0px)';
                //jumbo.style.webkitFilter = 'blur('+ $window.pageYOffset / 50 +'px);'
             }
            scope.$apply();
        });
    };
}]);
