(function() {
	'use strict';

	angular.module('app').controller('ModalRegister', ModalRegister);

	function ModalRegister($scope, $http, $uibModalInstance, UserRegistrationFactory) {

		if(UserRegistrationFactory.inUpdateMode) {
			$scope.updateMode = true;
			$scope.user = UserRegistrationFactory.userData;
		}

		$scope.submitForm = function (user) {

			if($scope.updateMode) {
				$http.put('usersApi/users/' + user._id, user).success(function(response){
					console.log(response);
					$uibModalInstance.close('Updated a user');
				});
			} else {
				$http.post("/register/" + user.role, user).success(function(response) {
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