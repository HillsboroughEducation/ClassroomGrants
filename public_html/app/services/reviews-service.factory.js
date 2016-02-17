(function() {
	'use strict';

	angular.module('app').factory('ReviewsService', ReviewsService);

	function ReviewsService($http) {

		var ReviewsService = {};

		ReviewsService.createNewReviewWithReviewerIdAsync = function(projectReview) {
			var uri = '/reviewsApi/projectReview'
			return $http.post(uri, {"review":projectReview});
		}

		ReviewsService.getPendingReviewsWithReviewerIdAsync = function(reviewerId) {
			var uri = '/reviewsApi/projectReview?reviewerId=' + reviewerId + '&status=pending';

			return $http.get(uri);
		}

		ReviewsService.updateReviewAsync = function(review) {
			console.log("hit update review function");
			var uri = '/reviewsApi/projectReview';
			return $http.put(uri, {"review": review});
		}

		return ReviewsService;
	}
})();