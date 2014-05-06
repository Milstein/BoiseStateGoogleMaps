'use strict';

var myBoiseState = angular.module('myBoiseState', [
  'ngRoute',
  'ngAnimate',
  'myBoiseState.services',
  'myBoiseState.controllers',
  'myBoiseState.directives',
  'chieffancypants.loadingBar',
  'google-maps'
]);

/* MYBOISESTATE ROUTES */

myBoiseState.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index-mock.html',
      }).
      when('/BSocial', {
        templateUrl: 'partials/bsocial.html',
        controller: 'BSocialController',
        resolve: {
          facebookPosts: function(BSocialServices) {
            return BSocialServices.getFacebookPosts();
          },
          twitterPosts: function(BSocialServices) {
            return BSocialServices.getTwitterPosts();
          },
          googlePlusPosts: function(BSocialServices) {
            return BSocialServices.getGooglePlusPosts();
          },
          instagramPosts: function(BSocialServices) {
            return BSocialServices.getInstagramPosts();
          }
        }
      }).
      when('/BSocial/Facebook', {
        templateUrl: 'partials/bsocial-facebook.html',
        controller: 'BSocialController',
        resolve: {
          facebookPosts: function(facebookPosts) {
            return facebookPosts.getPosts();
          }
        }
      }).
      when('/EditMenu', {
        templateUrl: 'partials/edit-menu.html',
        controller: 'EditMenuCtrl'
      }).
      when('/StudentDashboard', {
        templateUrl: 'partials/student-dashboard.html',
        controller: 'StudentDashboardCtrl'
      }).
      when('/EmployeeDashboard', {
        templateUrl: 'partials/employee-dashboard.html',
        controller: 'EmployeeDashboardCtrl'
      }).
      when('/AffiliateDashboard', {
        templateUrl: 'partials/affiliate-dashboard.html',
        controller: 'AffiliateDashboardCtrl'
      }).
      when('/PortalOnlyDashboard', {
        templateUrl: 'partials/portalonly-dashboard.html',
        controller: 'PortalOnlyDashboardCtrl'
      }).
      when('/AlumnusDashboard', {
        templateUrl: 'partials/alumnus-dashboard.html',
        controller: 'AlumnusDashboardCtrl'
      }).
      when('/EmeritusDashboard', {
        templateUrl: 'partials/emeritus-dashboard.html',
        controller: 'EmeritusDashboardCtrl'
      }).
      when('/CampusUpdate', {
        templateUrl: 'partials/campus-update.html',
        controller: 'CampusUpdateController',
        resolve: {
          campusFeed: function(campusFeed) {
            return campusFeed.getArticles();
          },
          campusEvents: function(campusEvents) {
            return campusEvents.getEvents();
          }
        }
      }).
      when('/Athletics', {
        templateUrl: 'partials/athletics.html',
        controller: 'AthleticsCtrl',
        resolve: {
          getArticles: function(athleticsService) {
            return athleticsService.getArticles();
          },
          getVideos: function(athleticsService) {
            return athleticsService.getVideos();
          },
          getEvents: function(athleticsService) {
            return athleticsService.getEvents();
          }
        }
      }).
      when('/CourseSearch', {
        templateUrl: 'partials/course-search.html',
        controller: 'CourseSearchCtrl',
        resolve: {
          getSubjects: function(courseSearchServices) {
            return courseSearchServices.getSubjects();
          }
        }
      }).
      when('/Directory', {
        templateUrl: 'partials/directory.html',
        controller: 'DirectoryCtrl'
      }).
      when('/CampusMap', {
        templateUrl: 'partials/campus-map.html',
        controller: 'CampusMapCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
