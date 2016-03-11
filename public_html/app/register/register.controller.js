(function() {
	'use strict';

	angular.module('app').controller('Register', Register);

	function Register($scope, $http, $q, $state, $rootScope, $stateParams, UsersService, MailService, usSpinnerService, Notification) {

		$scope.user = {};
		var updateMode = false;

		if($stateParams.completeRegistrationMessage) {
			Notification({title: 'Account Setup Verified', message: 'Please complete your registration'});
		}

		setStateOnLoad().then(function(userData) {
			if(userData) {
				console.log("In update mode");
				updateMode = true;
				$scope.user = userData;
				$scope.user.password = "";
			}
		});

		loadSecurityQuestions();

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
			return ($scope.isLastStep()) ? 'Complete Registration' : 'Next';
		}

		$scope.handlePrevious = function () {
			$scope.step -= ($scope.isFirstStep() ? 0 : 1);
		}

		$scope.handleNext = function() {
			if($scope.isLastStep()) {
				if(updateMode) {
					UsersService.completeRegistrationAsync($scope.user).then(function(response) {
						console.log(response.data);
						$state.go('auth.login', {"newUser":true});
					});
				} else {
				  register($scope.user);
				}				
				
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

		function loadSecurityQuestions() {
			UsersService.getSecurityQuestionsFromFile().then(function(response) {
				$scope.securityQuestions = response.data;
			});
		}

		function register(user) {

			usSpinnerService.spin('spinner-1');
			UsersService.registerUserAsync(user, "Applicant", "newUser").then(handleSuccess, handleError);		

			function handleSuccess(response) {
				var user = response.data;
				MailService.sendRegistrationConfirmationAsync(user).then(function(response) {
					usSpinnerService.stop('spinner-1');
					$state.go('auth.login', {"newUser":true});
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

		function setStateOnLoad() {
			var deferred = $q.defer();
			$http.get('/loggedin').success(function(user) {
		        // User is Authenticated
		        console.log("called set state on load");
		        //console.log(user);
		        if (user !== '0') {
		        	deferred.resolve(user);
		        }
		        else
		        {      
		            deferred.reject();
		        }
			});

			return deferred.promise;
		}
	}
})();