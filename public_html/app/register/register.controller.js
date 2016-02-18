(function() {
	'use strict';

	angular.module('app').controller('Register', Register);

	function Register($scope, $http, $state, $rootScope, UsersService, MailService, usSpinnerService) {

		$scope.user = {};
		$scope.error = false;

		$scope.register = function(user) {

			usSpinnerService.spin('spinner-1');
			UsersService.registerUserAsync(user, "Applicant", "newUser").then(handleSuccess, handleError);		

			function handleSuccess(response) {
				var user = response.data;
				MailService.sendRegistrationConfirmationAsync(user).then(function(response) {
					usSpinnerService.stop('spinner-1');
					$state.go('login', {"newUser":true});
				});
			};

			function handleError(error) {
				if(error) {
					usSpinnerService.stop('spinner-1');
					$scope.error = true;
					$scope.errorMessage = "An error occurred";
				}
			};
		}
	}
})();