/**
 * Created by fzoozai on 01/10/2016.
 */

(function () {

        var app = angular.module("githubViewer", []);

        var MainCtrl = function ($scope, $http) {

            var onUserComplete = function (response) {
                $scope.user = response.data;
                $http.get($scope.user.repos_url)
                    .then(onRepos, onError);
            };

            var onRepos = function (response) {
                $scope.repos = response.data;
            }

            var onError = function (reason) {
                $scope.error= "Could not fetch the data :("
            };

            $scope.search = function(username){
                $http.get("http://api.github.com/users/" + username)
                    .then(onUserComplete, onError);
            };

            $http.get("http://api.github.com/users/angular")
                .then(onUserComplete);

            /*Default values for the form*/
            $scope.username = "angular";
            $scope.message = "Github Viewer"


        };

        app.controller("MainCtrl", ["$scope", "$http", MainCtrl]);

}());
