(function() {
	'use strict';

	angular.module('app').controller('ReviewSummary', ReviewSummary);

	function ReviewSummary($scope, $state, $stateParams, ApplicationsService, ReviewsService) {
	

		loadReviewSummaryData($stateParams.project);


		function loadReviewSummaryData(project) {
			$scope.project = project;
			ApplicationsService.getBudgetItemsForProjectIdAsync(project._id).then(function(response) {
				console.log(response.data);
				$scope.budgetItems = response.data;
				return ReviewsService.getReviewsForProjectIdAsync(project._id);
			}).then(function(response) {
				console.log(response.data);
				$scope.reviews = response.data;
			});
		}
	}
})();