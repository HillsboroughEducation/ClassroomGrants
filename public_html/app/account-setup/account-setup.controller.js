(function() {
	'use strict';

	angular.module('app').controller('AccountSetup', AccountSetup);

	function AccountSetup($scope, $state, $rootScope, UsersService, Notification) {

		$scope.setupAccount = function(user) {

			UsersService.tempLoginAsync(user).then(function(response) {
				console.log(response.data);
				$rootScope.currentUser = response.data;
				$state.go('auth.register', {'completeRegistrationMessage':true});
			});
			/*
			UsersService.validateAccountSetup(user.email, user.password).then(function(response) {
				console.log(response.data);
				if((response.data.userId == null) && (response.data.passwordInvalid == false)) {
					Notification.error({message:"You entered an invalid email", positionY:'top', positionX: 'center'});
				} else if((response.data.userId == null) && (response.data.passwordInvalid == true)) {
					Notification.error({message:"You entered an invalid password", positionY:'top', positionX: 'center'});
				} else if(response.data.userId) {
					$state.go('auth.register', {'userId':response.data.userId});
				}
			});*/
		}
	}

})();