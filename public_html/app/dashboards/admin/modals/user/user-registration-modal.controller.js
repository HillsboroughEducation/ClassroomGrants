(function() {
	'use strict';

	angular.module('app').controller('ModalRegister', ModalRegister);

	function ModalRegister($scope, $http, $uibModalInstance) {
		$scope.register = function (user) {
			$http.post("/register/" + user.role, user).success(function(response) {
				console.log(response);
				$uibModalInstance.close('Registered a new user');
			});
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();