(function() {
	'use strict';

	angular.module('app').controller('ModalRegister', ModalRegister);

	function ModalRegister($scope, $http, $uibModalInstance, UserRegistrationFactory, UsersService) {

		console.log(UserRegistrationFactory.inUpdateMode);
		if(UserRegistrationFactory.inUpdateMode) {
			$scope.updateMode = true;
			$scope.user = UserRegistrationFactory.userData;
		}

		$scope.submitForm = function (user) {

			if($scope.updateMode) {
				UsersService.updateUserAsync(user).success(function(response) {
					console.log(response);
					$uibModalInstance.close('Updated a user');
				});
			} else {
				UsersService.registerUserAsync(user, "Admin", user.role).success(function(response){
					console.log(response);
					$uibModalInstance.close('Registered a new user');
				});
			}
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();