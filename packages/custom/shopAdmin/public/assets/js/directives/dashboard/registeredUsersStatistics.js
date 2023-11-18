'use strict';

angular.module('mean.shopAdmin').directive('registeredUsersStatistics', ['userService',
    function(userService) {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'shopAdmin/views/dashboard/registered-users-statistics.html',
            link: function(scope, element, attrs) {
                scope.getUserStatistics = function() {
                    userService.getUserStatistics()
                        .$promise
                        .then(function(userStatistics) {
                            scope.userStatistics = userStatistics;
                        });
                };
                scope.getUserStatistics();
            }
        };
    }
]);
