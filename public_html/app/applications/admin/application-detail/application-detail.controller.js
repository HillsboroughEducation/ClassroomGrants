(function() {
	'use strict';

	angular.module('app').controller('AdminApplicationDetail', AdminApplicationDetail);

	function AdminApplicationDetail($scope, $stateParams, ApplicationsService) {

		$scope.project = {};
		$scope.budgetItems = {};
		$scope.print=function(){
	window.print();
};
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