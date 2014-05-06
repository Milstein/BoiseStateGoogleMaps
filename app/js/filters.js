'use strict';

/* Filters */

var myBoiseStateFilters = angular.module('myApp.filters', []);

myBoiseStateFilters.filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
}]);

myBoiseStateFilters.filter('groupBy', function(){
    return function (list, groupBy) {

        var currGroup = [];
        var groups = [currGroup];
        var prevItem = null;
        var newGroup = false;
        var groupBy = angular.isArray(groupBy) ? groupBy : [groupBy];

        angular.forEach(list, function (item) {
            newGroup = false;

            if( prevItem !== null ){
                angular.forEach(groupBy, function(groupByProp){
                    if( item[groupByProp] !== prevItem[groupByProp] ){
                        newGroup = true;
                    }
                });
            }

            if( newGroup ){
                currGroup = [ item ];
                groups.push(currGroup);
            } else {
                currGroup.push( item );
            }

            prevItem = item;

        });

        return groups;
    };
});
