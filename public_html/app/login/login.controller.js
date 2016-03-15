(function() {
	'use strict';

	angular.module('app').controller('Login', Login);

	function Login($scope, $rootScope, $http, $log, $state, $stateParams, UsersService, Notification) {

		$scope.user = {};

		if($stateParams.newUser) {
			Notification({title: 'Registration Complete', message: 'Thank you for registering. Please login.'});
			$stateParams.newUser = null;
		}

		if($stateParams.passwordUpdateMessage) {
			Notification({title: 'Success', message: 'Your password has been updated. Please login.'});
			$stateParams.passwordUpdateMessage = false;
		}

		$scope.login = function(user) {
			UsersService.loginUserAsync(user).then(handleSuccess, handleError);

			function handleSuccess(response) {
				$rootScope.currentUser = response.data;
				//$rootScope.loggedIn = true;
				$rootScope.$broadcast('loginStateChanged');

				if($rootScope.currentUser.role == 'Admin') {
					$state.go('main.admin-dashboard');
				}

				if($rootScope.currentUser.role == 'Reviewer') {
					$state.go('main.reviewer-applications');
				}
				
				if($rootScope.currentUser.role == 'Applicant') {
					$state.go('main.applicant-applications');
				}
			};

			function handleError(error) {
				Notification.error({message:"You entered invalid credentials.", positionY:'top', positionX: 'center'});
			};
		}

	}
})();