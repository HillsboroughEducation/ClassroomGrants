(function() {
	'use strict';

	angular.module('app').controller('AccountSetup', AccountSetup);

	function AccountSetup($scope, $state, UsersService, Notification) {

		$scope.setupAccount = function(user) {
			UsersService.validateAccountSetup(user.email, user.password).then(function(response) {
				console.log(response.data);
				if((response.data.userId == null) && (response.data.passwordInvalid == false)) {
					Notification.error({message:"You entered an invalid email", positionY:'top', positionX: 'center'});
				} else if((response.data.userId == null) && (response.data.passwordInvalid == true)) {
					Notification.error({message:"You entered an invalid password", positionY:'top', positionX: 'center'});
				} else if(response.data.userId) {
					//Notification({title: 'Success', message: 'Please complete your registration.'});
					$state.go('auth.register', {'userId':response.data.userId});
				}
			});
		}
	}

})();