(function() {
	'use strict';

	angular.module('app').controller('ApplicationDetail', ApplicationDetail);

	function ApplicationDetail($scope, $http, AdminApplicationsModalsService) {
		$scope.project = AdminApplicationsModalsService.project;
	}
	
})();