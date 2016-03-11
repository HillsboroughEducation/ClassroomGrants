(function() {
	
	'use strict';

	angular.module('app').controller('PasswordRecovery', PasswordRecovery);

	function PasswordRecovery($scope, $state, $stateParams, UsersService, usSpinnerService, Notification) {
		
		$scope.user;
		$scope.username;
		$scope.passwordUpdate;
		$scope.questionText;
		$scope.securityAnswer;
		$scope.questionNumber;
		$scope.steps = ['one', 'two', 'three'];
		$scope.step = 0;

		var counter = {'value':0};

		$scope.getCurrentStep = function() {
			return $scope.steps[$scope.step];
		}


		$scope.checkUsername = function(username) {

			UsersService.checkUsername(username).then(function(response) {
				if(!response.data.usernameExists) {
					Notification.error({message:"You entered an invalid username.", positionY:'top', positionX: 'center'});
				} else {
					$scope.username = username;
					$scope.step = 1;
					return UsersService.getSecurityQuestions(username);
				}
			}).then(function(response) {
				$scope.securityQuestions = response.data;
				selectSecurityQuestion(response.data, counter);
			});
		}

		$scope.checkSecurityAnswer = function(answer) {
			UsersService.validateSecurityQuestionAnswer($scope.username, answer, $scope.questionNumber).then(handleSuccess, handleError);

			function handleSuccess(response) {
				$scope.user = response.data;
				$scope.step = 2;
			}

			function handleError(error) {
				console.log(error);
				Notification.error({message:"You entered an invalid answer, try again.", positionY:'top', positionX: 'center'});
				selectSecurityQuestion($scope.securityQuestions, counter);
				$scope.step = 1;
			}
		}

		$scope.updatePassword = function(passwordUpdate) {
			if(passwordUpdate.newPassword != passwordUpdate.confirmPassword) {
				Notification.error({message:"Password do not match.", positionY:'top', positionX: 'center'});
			} else {
				usSpinnerService.spin('spinner-1');
				$scope.user.password = passwordUpdate.newPassword;
				UsersService.updateUserPasswordAsync($scope.user).then(handleSuccess, handleError);
			}

			function handleSuccess(response){
				usSpinnerService.stop('spinner-1');
				$state.go('auth.login', {'passwordUpdateMessage':true});
			}

			function handleError(error) {
				Notification.error({message:"Internal Server Error. Please try again later.", positionY:'top', positionX: 'center'});
			}
		}

		function selectSecurityQuestion(securityQuestions, counter) {
			counter.value++;
			var index = counter.value % 3;
			//var randomIndex = Math.floor(Math.random() * securityQuestions.length);
			$scope.questionText = securityQuestions[index];
			$scope.questionNumber = index + 1;
		}

	}

})();