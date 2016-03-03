(function() {
	'use strict';

	angular.module('app').controller('ReviewerApplications', ReviewerApplications);

	function ReviewerApplications($scope, $http, $rootScope, $uibModal, $log, ApplicationsService, ReviewsService) {

		loadApplicationsQueue();

		$scope.reviewApplication = function(review) {

			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/applications/reviewer/modals/review-editor/review-editor-modal-template.html',
		      controller: 'ReviewEditor',
		      size:'lg',
		      resolve: {
				    reviewData: function () {
				      return review;
				    }
  				}
		    });

		    modalInstance.result.then(function (project) {
		    	project.numReviews += 1;
		    	if(project.numReviews === 3) {
		    		project.projectStatus = 'Awaiting Decision';
		    	}
		    	ApplicationsService.updateProjectAsync(project).then(function(response) {
		    		loadApplicationsQueue();
		    	});
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		}

		function loadApplicationsQueue(){
			var reviewerId = $rootScope.currentUser._id;
			ReviewsService.getPendingReviewsWithReviewerIdAsync(reviewerId).then(function(response) {
				console.log(response.data);
				$scope.pendingReviews = response.data;
			});
		}

	}
})();