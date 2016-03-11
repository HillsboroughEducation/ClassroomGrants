(function() {
	'use strict';

	angular.module('app').controller('ModalRegister', ModalRegister);

	function ModalRegister($scope, $http, $uibModalInstance, UserRegistrationFactory, MailService, UsersService, Notification) {

		console.log(UserRegistrationFactory.inUpdateMode);
		if(UserRegistrationFactory.inUpdateMode) {
			$scope.updateMode = true;
			$scope.user = UserRegistrationFactory.userData;
		}

		$scope.inviteUser = function(user) {
			if($scope.updateMode) {
				UsersService.updateUserInfoAsync(user).success(function(response) {
					console.log(response);
					$uibModalInstance.close('Updated a user');
				});
			} else {
				UsersService.initializeNewUserAccount(user).then(function(response) {
					console.log(response.data.user);
					if(response.data.user == null) {
						Notification.error({message:"Invitation Failed. Someone is already registered with the email " + user.email + '.', positionY:'top', positionX: 'center'});
						return MailService.inviteUser(user, false);
					} else {
						return MailService.inviteUser(user, true);
					}
				}).then(function(response){
					console.log(response);
					if(response.data.message === '2') {
						$uibModalInstance.close();
					} else if(response.data.message === '1') {
						Notification({title: 'Success', message: 'An invitation has been sent and an account has been opened for ' + user.firstName + ' ' + user.lastName + '.'});
						$uibModalInstance.close();
					} else if(response.data.message === '0') {
					  	Notification.error({message:"Your users account was oppened by the invitation failed to send. Please inform the user.", positionY:'top', positionX: 'center'});
						$uibModalInstance.close();
					}
				});
			}
		}
		
		$scope.submitForm = function (user) {
			if($scope.updateMode) {
				UsersService.updateUserInfoAsync(user).success(function(response) {
					console.log(response);
					$uibModalInstance.close('Updated a user');
				});
			} else {
				UsersService.initializeNewUserAccount(user).then(function(response) {
					console.log(response.data.user);
					if(response.data.user == null) {
						Notification.error({message:"Invitation Failed. Someone is already registered with the email " + user.email + '.', positionY:'top', positionX: 'center'});
						return MailService.inviteUser(user, false);
					} else {
						return MailService.inviteUser(user, true);
					}
				}).then(function(response){
					console.log(response);
					if(response.data.message === '2') {
						$uibModalInstance.close();
					} else if(response.data.message === '1') {
						Notification({title: 'Success', message: 'An invitation has been sent and an account has been opened for ' + user.firstName + ' ' + user.lastName + '.'});
						$uibModalInstance.close();
					} else if(response.data.message === '0') {
					  	Notification.error({message:"Your users account was oppened by the invitation failed to send. Please inform the user.", positionY:'top', positionX: 'center'});
						$uibModalInstance.close();
					}
				});
			}
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();