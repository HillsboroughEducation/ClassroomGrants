(function() {
	'use strict';

	angular.module('app').controller('ModalRegister', ModalRegister);

	function ModalRegister($scope, $http, $uibModalInstance) {
		$scope.ok = function () {
			$uibModalInstance.close('passed a string');
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();