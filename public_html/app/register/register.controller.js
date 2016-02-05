(function() {
	'use strict';

	angular.module('app').controller('Register', Register);

	function Register($scope, $http, $state, $rootScope, UsersService) {

		$scope.user = {};
		$scope.error = false;

		$scope.register = function(user) {

			UsersService.registerUserAsync(user, "Applicant", "newUser").then(handleSuccess, handleError);		

			function handleSuccess(response) {
				$rootScope.currentUser = response.data;
				$rootScope.$broadcast('currentUser');
				$rootScope.loggedIn = true;
				$rootScope.appInProgress = true;
				$rootScope.$broadcast('loginStateChanged');
				$state.go('project',{});
			};

			function handleError(error) {
				if(error) {
					$scope.error = true;
					$scope.errorMessage = "An error occurred";
				}
			};
		}
	}
})();