'use strict';

/* Controllers */

var myBoiseStateControllers = angular.module('myBoiseState.controllers', ['ui.bootstrap', 'ngSanitize', 'ui.sortable']);

/*
* Application Controller
* This handles all the logic that must persist throughout the life of the application such as
* listening for sockets
*/

myBoiseStateControllers.controller('ApplicationController', ['$scope', 'socket', '$modal', function($scope, socket, $modal){

  $scope.alerts = [];
/*
  socket.on('alert', function (data) {
    //$scope.name = data.name;
    //$scope.users = data.users;
    console.log(data);
    $scope.alerts.push(data);
  });

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
*/
  $scope.signInModal = function($event) {

    $event.preventDefault();

    var modalInstance = $modal.open({
      templateUrl: 'partials/sign-in.html',
      controller: 'SignInModalCtrl',
      scope: $scope
    });
  };
}]);

myBoiseStateControllers.controller('SignInModalCtrl', ['$scope', '$modalInstance', '$location', function($scope, $modalInstance, $location) {

    $scope.ok = function () {
        $modalInstance.close();
        //console.log($location);
        $location.path('/StudentDashboard');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);


/*
* EDIT MENU AND QUICK LINKS CONTROLLER
*
*/
myBoiseStateControllers.controller('EditMenuCtrl', ['$scope', 'profile', '$modal', function($scope, profile, $modal) {

  $scope.menu = profile.list();

  // Hardcoded resource values... should come from service...
  $scope.resources = [
    {name: 'Athletics', path: '/Athletics', icon: 'glyphicon glyphicon-flag', external: false, id: 2, description: 'Keep up to date with headlines, videos, and schedules from your favorite Bronco sports.', disabled: false },
    {name: 'myUpdate', path: '/CampusUpdate', icon: 'glyphicon glyphicon-list-alt', external: false, id: 3, description: 'Subscribe to news and blogs from many sources on campus to create your own custom Boise State feed.', disabled: false },
    {name: 'Campus Map', path: 'http://maps.boisestate.edu', icon: 'glyphicon glyphicon-link', external: true, id: 4, description: 'Are you looking for parking, shuttles, or specific building or classroom? Check our interactive campus map.', disabled: false },
    {name: 'BSocial', path: '/BSocial', icon: 'glyphicon glyphicon-picture', external: false, id: 1, description: 'Check out what is happening on Google+, Facebook, Instagram and Twitter through #boisestate and Boise State accounts.', disabled: false },
    {name: 'Course Search', path: '/CourseSearch', icon: 'glyphicon glyphicon-book', external: false, id: 5, description: 'Search for classes and plan your upcoming semester.', disabled: false },
    {name: 'Directory', path: '/Directory', icon: 'glyphicon glyphicon-user', external: false, id: 6, description: 'Search for faculty and staff to find Boise State employees.', disabled: false },
    {name: 'Library', path: 'http://library.boisestate.edu', icon: 'glyphicon glyphicon-link', external: true, id: 7, description: 'Use the Albertson\'s Library website to search for books, articles and academic journals', disabled: false },
    {name: 'Bronco Jobs', path: 'http://career.boisestate.edu/broncojobs', icon: 'glyphicon glyphicon-link', external: true, id: 9, description: 'Looking for a job or internship? Take advantage of what the Career Center has to offer.', disabled: false },
    {name: 'Academic Advising', path: 'http://academicadvising.boisestate.edu/', icon: 'glyphicon glyphicon-link', external: true, id: 10, description: 'Get student academic support, tutoring services and skill building workshops.', disabled: false },
    {name: 'Bookstore', path: 'http://www.boisestatebooks.com', icon: 'glyphicon glyphicon-link', external: true, id: 11, description: 'Find your text books for the next semester as well as supplies needed for your classes.', disabled: false },
    {name: 'Undergraduate Catalogs', path: 'http://registrar.boisestate.edu/undergraduate', icon: 'glyphicon glyphicon-link', external: true, id: 15, description: 'Find the current undergraduate catalog in addition to previous active catalogs.', disabled: false },
    {name: 'Digication', path: 'https://digication.com/external/openid/?domain=u.boisestate.edu', icon: 'glyphicon glyphicon-link', external: true, id: 16, description: 'Your resource to do whatever digication does.', disabled: false },
    {name: 'The Arbiter', path: 'http://arbiteronline.com/', icon: 'glyphicon glyphicon-link', external: true, id: 14, description: 'Boise State\'s independent student news source.', disabled: false },
    {name: 'Intern Placement Tracking', path: 'http://sspa.boisestate.edu/socialwork/fieldwork/ipt/', icon: 'glyphicon glyphicon-link', external: true, id: 13, description: 'School of Social Work internplacement tracking.', disabled: false  },
    ];

  $scope.addToMenu = function(resource, event){
    resource.disabled = true;
    profile.add(resource);
  };

  $scope.removeMenuItem = function(menuItem, index){

    for (var a = 0; a < $scope.resources.length; a++) {
      //console.log($scope.resources[a].id);
      //console.log(menuItem.id);
      if($scope.resources[a].id === menuItem.id){
        $scope.resources[a].disabled = false;
      }
    }

    $scope.menu.splice(index, 1);
  };

  $scope.openCustomResourceModal = function(event) {
    event.preventDefault();

    var modalInstance = $modal.open({
      templateUrl: 'partials/customize-menu-modal.html',
      controller: 'CustomizeMenuModalCtrl',
      scope: $scope
    });

  };


  // This init function loops through each resource value and disables each 'add' button if that resource
  // already exists in users custom menu. This prevents users from adding the same resource to their
  // custom menu more than once.

  var init = function(){

    // Loop through all the resources
    for (var i = 0; i < $scope.resources.length; i++) {


      for (var j = 0; j < $scope.menu.length; j++) {

        if($scope.resources[i].id === $scope.menu[j].id) {
          $scope.resources[i].disabled = true;
        }

      }
      //console.log($scope.resources[i].id);
    }

  };

  // Fire init function
  init();

}]);

myBoiseStateControllers.controller('CustomizeMenuModalCtrl', ['$scope', '$modalInstance', 'profile', function($scope, $modalInstance, profile) {

    //$scope.name = 'Test';
    //$scope.path = 'http://boisestate.edu';
    $scope.resource = {name: '', path: '', icon: 'glyphicon glyphicon-link', external: true, id: null, description: '', disabled: false  };

    var addToMenu = function(resource, event){
      profile.add(resource);
    };

    $scope.addCustomResource = function (event) {
        console.log(this.name);
        $scope.resource.name = this.name;
        $scope.resource.path = this.path;

        addToMenu($scope.resource);

        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

/*
*  Main Navigation Controller
*/

myBoiseStateControllers.controller('MainNavController', ['$scope', '$location', 'profile', function($scope, $location, profile) {

  $scope.menu = profile.list();
  $scope.isCollapsed = true;

  $scope.getClass = function(path) {
    if ($location.path().substr(0, path.length) == path) {
      return "active";
    } else {
      return "";
    }
  };

  $scope.filterMenu = function(item) {

    console.log(item);
    return item;
  };

  $scope.goToStudentDashboard = function(){
    $location.path('/StudentDashboard');
  };

}]);

/* ATHLETICS CONTROLLER */

myBoiseStateControllers.controller('AthleticsCtrl', ['$scope', 'athleticsService', function($scope, athleticsService) {
  $scope.loadingView = true;

  athleticsService.getEvents().then(function(response) {
    $scope.athleticEvents = response.data.Content;
  });

  athleticsService.getArticles().then(function(response) {
    $scope.athleticArticles = response.data.Content;
  });

  athleticsService.getVideos().then(function(response){
    $scope.athleticVideos = response.data.Content;
  });

}]);

/* Course Search Controllers */

myBoiseStateControllers.controller('CourseSearchCtrl', ['$scope', 'courseSearchServices', function($scope, courseSearchServices) {
  courseSearchServices.getSubjects().then(function(response) {
    $scope.subjects = response.data.Content;
    //console.log(response.data.Content);
  });

  $scope.getSubjectCourses = function(event, subject, index) {
    //console.log(event);
    event.preventDefault();
    $scope.selectedCourse = null;
    $scope.selectedSubject = index;
    courseSearchServices.getSubjectCourses(subject.SubjectKey).then(function(response) {
      $scope.subjectCourses = response.data.Content;
    });
  };

  $scope.getCourseSections = function(event, course, index) {
    event.preventDefault();
    $scope.selectedCourse = index;
    courseSearchServices.getCourseSections(course.SubjectKey, course.CatalogNumKey).then(function(response){
      $scope.courseSections = response.data.Content;
      $scope.groupBy('Term');
    });
  };

  // sort the given collection on the given property. Called inside groupBy function above.
  function sortOn( collection, name ) {

      collection.sort(
          function( a, b ) {

              if ( a[ name ] <= b[ name ] ) {

                  return( -1 );

              }

              return( 1 );

          }
      );
  }


  $scope.groupBy = function( attribute ) {

    // First, reset the groups.
    $scope.groups = [];

    // Now, sort the collection of course sections on the
    // grouping-property. This just makes it easier
    // to split the collection.
    sortOn( $scope.courseSections, attribute );

    // I determine which group we are currently in.
    var groupValue = "_INVALID_GROUP_VALUE_";

    // As we loop over each section, add it to the
    // current group - we'll create a NEW group every
    // time we come across a new Term attribute value.
    for ( var i = 0 ; i < $scope.courseSections.length ; i++ ) {

        var section = $scope.courseSections[ i ];

        // Should we create a new group?
        if ( section[ attribute ] !== groupValue ) {

            var group = {
                label: section[ attribute ],
                sections: []
            };

            groupValue = group.label;

            $scope.groups.push( group );
        }

        // Add the friend to the currently active
        // grouping.
        group.sections.push( section );
    }
  };

  $scope.groups = [];

  //$scope.groupBy($scope.courseSections.Term);

}]);

/* BSocial Controllers */

myBoiseStateControllers.controller('BSocialController', ['$scope', '$modal', 'BSocialServices', function($scope, $modal, BSocialServices) {

  $scope.loadingView = true;

  BSocialServices.getFacebookPosts().then(function(response){
    $scope.facebookPosts = response.data.Content.data;
  });

  BSocialServices.getTwitterPosts().then(function(response){
    $scope.twitterPosts = response.data.Content.data;
  });

  BSocialServices.getInstagramPosts().then(function(response){
    $scope.instagramPosts = response.data.Content.data;
  });

  BSocialServices.getGooglePlusPosts().then(function(response) {
    $scope.googlePlusPosts = response.data.Content.data;
  });

  $scope.openFacebookModal = function($event, post) {
    $event.preventDefault();
    $scope.post = post;

    $modal.open({
      templateUrl: 'partials/bsocial-facebook-modal.html',
      controller: 'ModalInstanceCtrl',
      scope: $scope,
      resolve: {
        post: function () {
          return $scope.post;
        }
      }
    });
  };

}]);

myBoiseStateControllers.controller('ModalInstanceCtrl', [ '$scope', '$modalInstance', 'post',
 function($scope, $modalInstance, post) {
    //console.log(post);
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.sources = [
      { source: 'Campus Update', category: 'Featured', id: 1, saved: false },
      { source: 'Student', category: 'Current Students', id: 1, saved: false },
      { source: 'Office of Information Technology', category: 'Bronco Bytes', id: 1, saved: false },
      { source: 'Campus Update', category: 'Photo of the Week', id: 1, saved: false },
      { source: 'Athletics', category: 'Athletics', id: 1, saved: false },
      { source: 'The Arbiter', category: 'The Arbiter News', id: 7, saved: false },
      { source: 'The Arbiter', category: 'The Arbiter Sports', id: 7, saved: false },
      { source: 'The Arbiter', category: 'The Arbiter Opinion', id: 7, saved: false }
    ];

}]);

/* Directory  */

myBoiseStateControllers.controller('DirectoryCtrl', ['$scope', '$http', 'directoryService', function($scope, $http, directoryService){

  $scope.searchDirectory = function(val) {
    //console.log($scope.directoryInput);
    if(val.length >= 2) {
      directoryService.getPerson(val).then(function(response){
        //console.log(response.data.Content)
        $scope.employees = response.data.Content;
      });
    } else {
      $scope.employees = [];
    }
  };

}]);

/* CAMPUS UPDATE */
myBoiseStateControllers.controller('CampusUpdateController', ['$scope', '$http', '$modal', 'campusFeed', 'campusEvents', function($scope, $http, $modal, campusFeed, campusEvents) {

        $scope.feed = {name: 'Latest', url: 'https://web.boisestate.edu/myboisestatemobile/v2/campusupdate/getposts?rss=latest'};
        $scope.url = 'https://web.boisestate.edu/myboisestatemobile/v2/campusupdate/getposts?rss=latest';
        $scope.loadingView = true;
        $scope.feeds = [
          {name: 'Featured', url: 'https://web.boisestate.edu/myboisestatemobile/v2/campusupdate/getposts?rss=latest'},
          {name: 'Current Students', url: 'https://web.boisestate.edu/myboisestatemobile/v2/campusupdate/getposts?rss=current'},
          {name: 'Bronco Bytes', url: 'https://web.boisestate.edu/myboisestatemobile/v2/campusupdate/getposts?rss=bytes'},
          {name: 'Photo of the Week', url: 'https://web.boisestate.edu/myboisestatemobile/v2/campusupdate/getposts?rss=photo'},
          {name: 'Events', url: 'https://web.boisestate.edu/myboisestatemobile/v2/campusupdate/getposts?rss=events'},
        ];

        $scope.selectFeed = function(){

          $http.get($scope.feed.url).success(function(data){
            console.log(data.Content);
            $scope.campusFeed = data.Content;
            for(var i = 0; i < $scope.campusFeed.length; i++){
              var str = $scope.campusFeed[i].Image;
              if(str.indexOf('img/default') != -1) {
                //console.log(str);
                $scope.campusFeed[i].Image = null;
              }
            }
          });

        };

        $scope.campusFeed = campusFeed.data.Content;
        $scope.campusEvents = campusEvents.data.Content;

        $scope.openCustomizeFeedModal = function($event) {
          $event.preventDefault();

          var modalInstance = $modal.open({
            templateUrl: 'partials/campus-update-select-feed-modal.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope,
            resolve: {
              post: function () {
                return $scope.post;
              }
            }
          });
        };
}]);

myBoiseStateControllers.controller('EmployeeDashboardCtrl', ['$scope', 'profile', function($scope, profile ){


    $scope.isSelected = true;
    $scope.onLabel = 'Y';
    $scope.offLabel = 'N';
    $scope.isActive = true;
    $scope.size = 'large';
    $scope.animate = true;

    $scope.$watch('isSelected', function() {
      //$log.info('Selection changed.');
    });

    $scope.toggleActivation = function() {
      $scope.isActive = !$scope.isActive;
    };

}]);

myBoiseStateControllers.controller('AffiliateDashboardCtrl', ['$scope', 'profile', function($scope, profile ){


}]);

myBoiseStateControllers.controller('AlumnusDashboardCtrl', ['$scope', 'profile', function($scope, profile ){


}]);

myBoiseStateControllers.controller('EmeritusDashboardCtrl', ['$scope', 'profile', function($scope, profile ){


}]);

myBoiseStateControllers.controller('PortalOnlyDashboardCtrl', ['$scope', 'profile', function($scope, profile ){


}]);

myBoiseStateControllers.controller('StudentDashboardCtrl', ['$scope', 'profile' , function($scope, profile) {

  $scope.calendar = [
  {
    "EventID": "bkqsigo52dfbsmjguu6ebja7jc",
    "Title": "SP14: Spring Vacation. (University offices open.)",
    "StartTime": "/Date(1395640800000)/",
    "URL": "https://www.google.com/calendar/a/u.boisestate.edu",
    "AllDay": true
    },
    {
    "EventID": "d25o5l5vukt9rn9iv9mjaon138",
    "Title": "SP14: Spring Vacation. (University offices closed.)",
    "StartTime": "/Date(1396072800000)/",
    "URL": "https://www.google.com/calendar/a/u.boisestate.edu",
    "AllDay": true
    },
    {
    "EventID": "l95sl3cs4at8m7ncu1ddck5sio",
    "Title": "Residence Halls open (noon).",
    "StartTime": "/Date(1396072800000)/",
    "URL": "https://www.google.com/calendar/a/u.boisestate.edu",
    "AllDay": true
    },
    {
    "EventID": "c3k5969kct0lumfed91uec42eo",
    "Title": "SP14: Last day to submit review copy of dissertation or thesis with Final Reading Approval form signed by the supervisory committee chair to the Thesis and Dissertation Office for May graduation.",
    "StartTime": "/Date(1396245600000)/",
    "URL": "https://www.google.com/calendar/a/u.boisestate.edu",
    "AllDay": true
    },
    {
    "EventID": "lvs314g1gaqtkaspockoa7pb6g",
    "Title": "FA14: Registration for continuing students begins for Fall 2014 (by appointment).",
    "StartTime": "/Date(1396245600000)/",
    "URL": "https://www.google.com/calendar/a/u.boisestate.edu",
    "AllDay": true
    },
    {
    "EventID": "78pvq4l9jeqqrgsvcf0tcofd1c",
    "Title": "SP14: Last day of course instruction for 1st 10-wk and 2nd 5-wk session classes.",
    "StartTime": "/Date(1396591200000)/",
    "URL": "https://www.google.com/calendar/a/u.boisestate.edu",
    "AllDay": true
    },
    {
    "EventID": "5ojd6onka26ts8ljkvlu9dh19o",
    "Title": "SP14: Classes begin for 3rd 5-wk session classes. ",
    "StartTime": "/Date(1396850400000)/",
    "URL": "https://www.google.com/calendar/a/u.boisestate.edu",
    "AllDay": true
    },
    {
    "EventID": "7hv55but2c2k0dkrl3ib4hr6r0",
    "Title": "SP14: Last date for 2nd 8-wk session classes to drop or completely withdraw with a “W”. No Refund.",
    "StartTime": "/Date(1396850400000)/",
    "URL": "https://www.google.com/calendar/a/u.boisestate.edu",
    "AllDay": true
    },
    {
    "EventID": "1j2cgfb168ltih4paeiiugubg8",
    "Title": "SP14: Last day to add without instructor permission 3rd 5-wk session classes.",
    "StartTime": "/Date(1396936800000)/",
    "URL": "https://www.google.com/calendar/a/u.boisestate.edu",
    "AllDay": true
    },
    {
    "EventID": "a9266s8d3l59acr824cfjjmgmg",
    "Title": "SP14: Last date for 3rd 5-wk classes to add with permission number, last date to drop or completely withdraw without a W and receive a refund (less a $40.00 processing fee), last date to change from credit-to-audit or audit-to-credit.",
    "StartTime": "/Date(1397023200000)/",
    "URL": "https://www.google.com/calendar/a/u.boisestate.edu",
    "AllDay": true
    }
  ];
}]);

myBoiseStateControllers.controller('CampusMapCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

  var maxIndoorZoom = 12,
      zoom = 17;

  var map,
      principalLayer;

  var boiseStateCenter = {
    latitude: 43.601789,
    longitude: -116.202339
  };

  var instantiateMap = function (mapInstance) {
    map = mapInstance;

    /********************************************************
    * Create fusion table Layer, add listeners to style layer,
    * finally set layer on the map.
    ********************************************************/
    principalLayer = new google.maps.FusionTablesLayer({
      query: {
        select: 'geometry',
        from: '1E7EdChSMT6erylIRXmc7H7LiBXpejc0x-0ohtQ',
        where: '\'In_Mobile_Map\' CONTAINS IGNORING CASE \'yes\' AND \'feature_subtype\' CONTAINS IGNORING CASE \'principal\''
      },
      styles: [{
        where: '\'feature_subtype\' CONTAINS IGNORING CASE \'principal\'',
        polygonOptions: {
          fillColor: "#3399cc",
          fillOpacity: '0.01',
          strokeColor: "#3399cc",
          strokeWeight: 2.5
        }
      }]
    });

    principalLayer.setMap(mapInstance);
  };


  $scope.map = {
    center: boiseStateCenter,
    zoom: 17,
    options: {
      overviewMapControl: true,
      panControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      }
    },
    events: {

      tilesloaded: function(map) {
        $scope.$apply(function() {
          instantiateMap(map);
        });
      },

      zoom_changed: function() {
        console.log(map);
        principalLayer = new google.maps.FusionTablesLayer({
          query: {
            select: 'geometry',
            from: '1E7EdChSMT6erylIRXmc7H7LiBXpejc0x-0ohtQ',
            where: '\'In_Mobile_Map\' CONTAINS IGNORING CASE \'yes\' AND \'feature_subtype\' CONTAINS IGNORING CASE \'principal\''
          },
          styles: [{
            where: '\'feature_subtype\' CONTAINS IGNORING CASE \'principal\'',
            polygonOptions: {
              fillColor: "#FFFFFF",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2.5
            }
          }]
        });

        principalLayer.setMap(map);
      }

    },
    polygons: []
  };

  var polys = [
    {
        clickable: true,
        draggable: false,
        editable: false,
        visible: true,
        geodesic: false,
        stroke: {weight: 1,color:"#000080", opacity : 1},
        fill:{color: "#FFCE00", opacity : 1},
        path:[
            {latitude: -22.840109991554, longitude: -43.604843616486},
            {latitude: -22.895785581504, longitude: -43.660461902618},
            {latitude: -22.923614814482, longitude: -43.480560779572},
            {latitude: -22.840109991554, longitude: -43.604843616486}
        ]
    },
    {
        clickable: true,
        draggable: false,
        editable: false,
        visible: true,
        geodesic: false,
        stroke: {weight: 1,color:"#000080", opacity : 1},
        fill:{color: "#FFCE00", opacity : "0.3"},
        path:[
            {latitude: -22.220105243267, longitude: -42.533525750041},
            {latitude: -22.221535457024, longitude: -42.510480210185},
            {latitude: -22.241159694484, longitude: -42.517046257854},
            {latitude: -22.237336361699, longitude: -42.531315609813},
            {latitude: -22.227633565887, longitude: -42.534770295024},
            {latitude: -22.220105243267, longitude: -42.533525750041}
        ]
    },
    {
        clickable: true,
        draggable: false,
        editable: false,
        visible: true,
        geodesic: true,
        stroke: {weight: 1,color:"#000080", opacity : 1},
        fill:{color: "#0A67A3", opacity : "0.3"},
        path:[
            {latitude: -22.912122112782, longitude: -43.233883213252},
            {latitude: -22.912658229953, longitude: -43.233333360404},
            {latitude: -22.913135051277, longitude: -43.232568930835},
            {latitude: -22.914049160006, longitude: -43.231040071696},
            {latitude: -22.915007732268, longitude: -43.229344915599},
            {latitude: -22.915096671619, longitude: -43.229065965861},
            {latitude: -22.914958321493, longitude: -43.228862117976},
            {latitude: -22.91306587523, longitude: -43.227215241641},
            {latitude: -22.911054813301, longitude: -43.225868772715},
            {latitude: -22.910516219169, longitude: -43.230718206614},
            {latitude: -22.910317334098, longitude: -43.231544326991},
            {latitude: -22.910335246119, longitude: -43.231946658343},
            {latitude: -22.910432218057, longitude: -43.2324991934},
            {latitude: -22.9106644563, longitude: -43.233437966555},
            {latitude: -22.910508807309, longitude: -43.233000766486},
            {latitude: -22.9113932865, longitude: -43.2337786071},
            {latitude: -22.912122112782, longitude: -43.233883213252}
        ]
    }
  ];

  $scope.$on('$viewContentLoaded', function () {
    var mapHeight = window.innerHeight - 54; // top navbar, bottom navbar
    $("#campus-map .angular-google-map-container").height(mapHeight);
  });

  $timeout(function() {
    $scope.map.polygons = polys;
    $scope.$apply();
  }, 100);

}]);
