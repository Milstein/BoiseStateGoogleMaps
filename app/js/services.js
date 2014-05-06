'use strict';

var env = 'web',
    ver = 'v2/';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var myBoiseStateServices = angular.module('myBoiseState.services', []);

/* MAIN */

myBoiseStateServices.service('profile', function() {

  // Hardcoded, but should come from profile service...
  var menu = [
    {name: 'Course Search', path: '/CourseSearch', icon: 'glyphicon glyphicon-book', external: false, id: 5 },
    {name: 'Campus Update', path: '/CampusUpdate', icon: 'glyphicon glyphicon-list-alt', external: false, id: 3 },
    {name: 'BSocial', path: '/BSocial', icon: 'glyphicon glyphicon-picture', external: false, id: 1 },
    {name: 'Campus Map', path: '/CampusMap', icon: 'glyphicon glyphicon-link', external: false, id: 4 },
    {name: 'Athletics', path: '/Athletics', icon: 'glyphicon glyphicon-flag', external: false, id: 2 },
    {name: 'Directory', path: '/Directory', icon: 'glyphicon glyphicon-user', external: false, id: 6 }
  ];

  var menuService = {};

  menuService.add = function(item) {
    menuService.list().push(item);
  };

  menuService.remove = function(item) {
    menuService.list().pop(item);
  };

  menuService.list = function() {
    return menu;
  };

  return menuService;

});

myBoiseStateServices.service('socket', function ($rootScope) {

  /* EMERGENCY ALERT SYSTEM */
  /*var socket = io.connect('http://notification.aws.af.cm');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };*/


});

/* ATHLETICS */
myBoiseStateServices.factory('athleticsService', function($http) {
  return {
    getArticles: function(sport) {
      return  $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'athletics/getposts?sport='+sport);
    },
    getVideos: function() {
      return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'athletics/getvideos');
    },
    getEvents: function() {
      return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'athletics/getschedule');
    }
  };
});

/* BSOCIAL */
myBoiseStateServices.factory('BSocialServices', function($http) {
	return {
    getFacebookPosts: function() {
        return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'facebook/getposts', { cache: true });
    },
    getTwitterPosts: function() {
         return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'/twitter/getposts', { cache: true });
    },
    getInstagramPosts: function() {
         return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'/instagram/getposts', { cache: true });
    },
    getGooglePlusPosts: function() {
         return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'/googleplus/getposts', { cache: true });
    }
	};
});

/* CAMPUS UPDATE */

myBoiseStateServices.factory('campusFeed', function($http) {
  return {
      getArticles: function(feed) {
           // $http.get returns a promise.
           return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'/campusupdate/getposts?rss='+feed, { cache: true });
      },
      getEvents: function() {
           // $http.get returns a promise.
           return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'/campusupdate/getposts?rss=events', { cache: true });
      }
  };

});

myBoiseStateServices.factory('campusEvents', function($http) {
  return {
      getEvents: function() {
           // $http.get returns a promise.
           return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'/campusupdate/getposts?rss=events', { cache: true });
      }
  };

});

/* COURSE SEARCH */
myBoiseStateServices.factory('courseSearchServices', function($http) {
  return {
    getSubjects: function() {
      return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'coursecatalog/getsubjects');
    },
    getSubjectCourses: function(subjectKey) {
      return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'coursecatalog/getcourses?subject='+subjectKey);
    },
    getCourseSections: function(subjectKey, catalogNumKey) {
      return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'coursecatalog/getsections?subjectkey='+subjectKey+'&catalognumkey='+catalogNumKey);
    }

  };
});

myBoiseStateServices.factory('directoryService', function($http) {
  return {
    getPerson: function(val) {
      return $http.get('https://'+env+'.boisestate.edu/myboisestatemobile/'+ver+'/CampusDirectory/Search', {
        params: {
          query: val
        }
      });
    }
  };
});
