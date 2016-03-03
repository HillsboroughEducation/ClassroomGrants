(function() {
	'use strict';

	angular.module('app').controller('ApplicationDetail', ApplicationDetail);

	function ApplicationDetail($scope, $stateParams, ApplicationsService) {

		$scope.project = {};
		$scope.budgetItems = {};

		loadApplicationData();

		function loadApplicationData() {
			ApplicationsService.getProjectWithIdAsync($stateParams.projectId).then(function(response) {
				$scope.project = response.data;
				return ApplicationsService.getBudgetItemsForProjectIdAsync(response.data._id);
			}).then(function(response) {
				$scope.budgetItems = response.data;
			});
		}
	}


})();