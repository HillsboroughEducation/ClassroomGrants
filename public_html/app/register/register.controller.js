(function() {
	'use strict';

	angular.module('app').controller('Register', Register);

	function Register($scope, $http, $state, $rootScope, UsersService, MailService, usSpinnerService, Notification) {

		$scope.user = {};
		$scope.error = false;

		$scope.steps = ['one', 'two', 'three'];
		$scope.step = 0;

		$scope.isFirstStep = function() {
			return $scope.step === 0;
		}

		$scope.isLastStep = function() {
			return $scope.step === ($scope.steps.length - 1);
		}

		$scope.isCurrentStep = function(step) {
			return $scope.step === step;
		}

		$scope.setCurrentStep = function(step) {
			$scope.step = step;
		}

		$scope.getCurrentStep = function() {
			return $scope.steps[$scope.step];
		}

		$scope.getNextLabel = function() {
			return ($scope.isLastStep()) ? 'Submit' : 'Next';
		}

		$scope.handlePrevious = function () {
			$scope.step -= ($scope.isFirstStep() ? 0 : 1);
		}

		$scope.handleNext = function() {
			if($scope.isLastStep()) {				
				register($scope.user);
			} else {
				$scope.step += 1;
			}
		}

		$scope.checkUsernameAndPassword = function() {
			if($scope.user.password != $scope.user.confirmPassword) {
				Notification.error({message:"Password do not match.", positionY:'top', positionX: 'center'});
			} else {	
				UsersService.checkUsername($scope.user.username).then(function(response) {
					if(response.data.usernameExists) {
						Notification.error({message:"Username already chosen.", positionY:'top', positionX: 'center'});
					} else {
						$scope.handleNext();
					}
				});
			}
		}

		function register(user) {

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