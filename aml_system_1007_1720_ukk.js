// 代码生成时间: 2025-10-07 17:20:56
(function() {
    'use strict';

    // Define the AML service
    angular.module('App').service('AMLService', ['$http', '$q', function($http, $q) {

        // The base URL for the AML API
        const AML_API_URL = 'https://api.aml-service.com/';

        // Function to check for suspicious activity
        this.checkSuspiciousActivity = function(transaction) {
            let deferred = $q.defer();
            try {
                // Send a POST request to the AML API with the transaction details
                $http.post(AML_API_URL + 'check', transaction)
                    .then(function(response) {
                        if (response.status === 200) {
                            // Resolve the promise with the API response
                            deferred.resolve(response.data);
                        } else {
                            // Reject the promise with an error message
                            deferred.reject('Failed to check suspicious activity');
                        }
                    }, function(error) {
                        // Reject the promise with the error object
                        deferred.reject(error);
                    });
            } catch (error) {
                // Catch any exceptions and reject the promise
                deferred.reject(error);
            }
            return deferred.promise;
        };

        // Function to report a suspicious activity to the authorities
        this.reportSuspiciousActivity = function(report) {
            let deferred = $q.defer();
            try {
                // Send a POST request to the AML API with the report details
                $http.post(AML_API_URL + 'report', report)
                    .then(function(response) {
                        if (response.status === 200) {
                            // Resolve the promise with the API response
                            deferred.resolve(response.data);
                        } else {
                            // Reject the promise with an error message
                            deferred.reject('Failed to report suspicious activity');
                        }
                    }, function(error) {
                        // Reject the promise with the error object
                        deferred.reject(error);
                    });
            } catch (error) {
                // Catch any exceptions and reject the promise
                deferred.reject(error);
            }
            return deferred.promise;
        };

    }]);

    // Define the AML controller
    angular.module('App').controller('AMLController', ['$scope', '$ionicPopup', 'AMLService', function($scope, $ionicPopup, AMLService) {

        // Function to handle suspicious activity check
        $scope.checkActivity = function(transaction) {
            AMLService.checkSuspiciousActivity(transaction).then(function(data) {
                // Handle successful response
                $ionicPopup.alert({
                    title: 'AML Check',
                    template: 'Activity checked successfully: ' + JSON.stringify(data)
                });
            }, function(error) {
                // Handle error response
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error checking activity: ' + error
                });
            });
        };

        // Function to handle suspicious activity report
        $scope.reportActivity = function(report) {
            AMLService.reportSuspiciousActivity(report).then(function(data) {
                // Handle successful response
                $ionicPopup.alert({
                    title: 'AML Report',
                    template: 'Report submitted successfully: ' + JSON.stringify(data)
                });
            }, function(error) {
                // Handle error response
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error submitting report: ' + error
                });
            });
        };

    }]);

})();