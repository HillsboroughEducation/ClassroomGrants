(function() {
	'use strict';

	angular.module('app').controller('Login', Login);

	function Login($scope, $rootScope, $http, $log, $state, $stateParams, Notification) {

		$scope.user = {};
		$scope.error = false;

		if($stateParams.newUser) {
			Notification({title: 'Registration Complete', message: 'Thank you for registering. Please login.'});
			$stateParams.newUser = null;
		}

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
					$state.go('applicant-applications');
				}
			};

			function handleError(error) {
				Notification.error({message:"You entered invalid credentials.", positionY:'top', positionX: 'center'});
			};
		}
	}
})();