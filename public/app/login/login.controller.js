(function() {
	'use strict';

	angular.module('app').controller('Login', Login);

	function Login($scope, $rootScope, $http, $log, $state) {

		$scope.login = function(user) {
			$http.post('/login', user)
			.then(handleSuccess, handleError);

			function handleSuccess(response) {
				$rootScope.currentUser = response.data;
				$rootScope.loggedIn = true;
				$rootScope.$broadcast('loginStateChanged');

				if($rootScope.currentUser.role == 'Admin') {
					$state.go('admin-dashboard');
				}

				if($rootScope.currentUser.role == 'Reviewer') {
					$state.go('reviewer-dashboard');
				}
				
				if($rootScope.currentUser.role == 'Applicant') {
					$state.go('applicant-dashboard');
				}
				
			};

			function handleError(error) {
				if(error){
					$scope.error = true;
					$scope.errorMessage = "Invalid Credentials";
				}
			};
		}
	}
})();