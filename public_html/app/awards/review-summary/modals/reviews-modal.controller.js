(function() {
	'use strict';

	angular.module('app').controller('Reviews', Reviews);

	function Reviews($scope, reviews, $uibModalInstance, section, title, ReviewsService) {
	
		$scope.reviews = ReviewsService.filterReviewsForSection(section, reviews);
		$scope.title = title;

		$scope.close = function() {
			$uibModalInstance.close();
		}
	}

})();