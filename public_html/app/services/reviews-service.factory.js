(function() {
	'use strict';

	angular.module('app').factory('ReviewsService', ReviewsService);

	function ReviewsService($http, $q) {

		var ReviewsService = {};

		ReviewsService.createNewReviewWithReviewerIdAsync = function(projectReview) {
			var uri = '/reviewsApi/projectReview';
			return $http.post(uri, {"review":projectReview});
		}

		ReviewsService.getReviewersAsync = function() {
			var uri = '/usersApi/users?role=Reviewer';
			return $http.get(uri);
		}

		ReviewsService.getPendingReviewsWithReviewerIdAsync = function(reviewerId) {
			var uri = '/reviewsApi/projectReview?reviewerId=' + reviewerId + '&status=pending';
			return $http.get(uri);
		}

		ReviewsService.getPendingReviewsWithProjectIdAsync = function(projectId) {
			var uri = '/reviewsApi/projectReview?projectId=' + projectId + '&status=pending';
			return $http.get(uri);
		}

		ReviewsService.getReviewsForProjectIdAsync = function(projectId) {
			var uri = '/reviewsApi/projectReview?projectId=' + projectId;
			return $http.get(uri);	
		}


		ReviewsService.updateReviewAsync = function(review) {
			console.log("hit update review function");
			var uri = '/reviewsApi/projectReview';
			return $http.put(uri, {"review": review});
		}

		ReviewsService.deleteReviewWithIdAsync = function(id) {
			var uri = '/reviewsApi/projectReview?id=' + id;
			return $http.delete(uri);
		}

		ReviewsService.computeAverageRatingsAsync = function(reviews) {
			var averageRatings = {};
			var deffered = $q.defer();
			if(reviews) {
				var essay1Sum = 0.0;
				var essay2Sum = 0.0;
				var budgetSum = 0.0;
				for(var x in reviews) {
					essay1Sum += reviews[x].essay1Score;
					essay2Sum += reviews[x].essay2Score;
					budgetSum += reviews[x].budgetScore;
				}
				averageRatings.essay1Avg = (essay1Sum / reviews.length).toFixed(1);
				averageRatings.essay2Avg = (essay2Sum / reviews.length).toFixed(1);
				averageRatings.budgetAvg = (budgetSum / reviews.length).toFixed(1);
				deffered.resolve(averageRatings);
			} else {
				deffered.reject("Failed to get reviews");
			}
			return deffered.promise;
		}

		ReviewsService.filterReviewsForSection = function(section, reviews) {
			var sectionReviews = [];
			for(var x in reviews) {
				var review = {};
				if(section == 'essay1') {
					review.rating = reviews[x].essay1Score;
					review.comments = reviews[x].essay1Comments;
				}

				if(section == 'essay2') {
					review.rating = reviews[x].essay2Score;
					review.comments = reviews[x].essay2Comments;
				}

				if(section == 'budget') {
					review.rating = reviews[x].budgetScore;
					review.comments = reviews[x].budgetComments;
				}
				sectionReviews.push(review);
			}
			return sectionReviews;
		}

		return ReviewsService;
	}
})();