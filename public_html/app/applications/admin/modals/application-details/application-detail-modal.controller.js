(function() {
	'use strict';

	angular.module('app').controller('ApplicationDetail', ApplicationDetail);

	function ApplicationDetail($scope, $http, $uibModalInstance, AdminApplicationsModalsService) {
		$scope.project = AdminApplicationsModalsService.project;
		$scope.close = function() {
			$uibModalInstance.dismiss();
		}
	}
	
})();