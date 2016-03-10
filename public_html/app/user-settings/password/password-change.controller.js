(function() {
	'use strict';

	angular.module('app').controller('PasswordChange', PasswordChange);

	function PasswordChange($scope, $state, $stateParams, usSpinnerService, Notification, UsersService) {

		$scope.user = {};
		$scope.passwordUpdate = {};

		loadUserData();

		$scope.back = function() {
			$state.go('main.user-settings', {'userId':$stateParams.userId});
		}	

		$scope.updatePassword = function(passwordUpdate) {
			if(passwordUpdate.newPassword != passwordUpdate.confirmPassword) {
				Notification.error({message:"Password do not match.", positionY:'top', positionX: 'center'});
			} else {
				//usSpinnerService.spin('spinner-1');
				$scope.user.password = passwordUpdate.newPassword;
				UsersService.updateUserAsync($scope.user).then(function(response) {
					//usSpinnerService.stop('spinner-1');
					console.log(response.data);
					if($scope.user.role == "Admin") {
						$state.go('main.admin-dashboard', {'passwordUpdateMessage':true});
					}
				});
			}
		}

		function loadUserData() {	
			UsersService.getUserWithIdAsync($stateParams.userId).then(function(response) {
				console.log(response.data);
				$scope.user = response.data;
			
			});
		}
	}
})();