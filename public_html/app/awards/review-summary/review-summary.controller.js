(function() {
	'use strict';

	angular.module('app').controller('ReviewSummary', ReviewSummary);

	function ReviewSummary($scope, $q, $state, $stateParams, $uibModal, ApplicationsService, ReviewsService) {
	
		$scope.project = {};
		$scope.reviews = {};
		$scope.budgetItems = {};
		$scope.ratingAverages = {};	

		loadReviewSummaryData($stateParams.project);

		$scope.seeReview = function(reviews, reviewSection, title) {

			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/awards/review-summary/modals/reviews-modal-template.html',
		      controller: 'Reviews',
		      size:'lg',
		      resolve: {
		      	reviews: function() {
		      		return reviews;
		      	},
		      	section: function() {
		      		return reviewSection;
		      	},
		      	title: function() {
		      		return title;
		      	}
		      }
		    });

		    modalInstance.result.then(function (data) {
		    	//returns data here
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		}

		function loadReviewSummaryData(project) {
			$scope.project = project;
			var reviews;
			ApplicationsService.getBudgetItemsForProjectIdAsync(project._id).then(function(response) {
				$scope.budgetItems = response.data;
				return ReviewsService.getReviewsForProjectIdAsync(project._id);
			}).then(function(response) {
				console.log(response.data);
				$scope.reviews = response.data;
				return ReviewsService.computeAverageRatingsAsync(response.data);
			}).then(function(ratings) {
				$scope.ratingAverages = ratings;
			});
		}
	}
})();