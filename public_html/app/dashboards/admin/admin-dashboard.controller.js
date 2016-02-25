(function() {
	'use strict';

	angular.module('app').controller('AdminDashboard', AdminDashboard);

	function AdminDashboard($scope, $http, $uibModal, $log, $rootScope, ChartsService) {
		ChartsService.getProjectCategoryCounts().then(function(response) {
			console.log(response);
		});
	}
})();

