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
		    	console.log("Completed modal close");
		    	console.log(project);
		    	project.numReviews += 1;
		    	ApplicationsService.updateProjectAsync(project).then(function(response) {
		    		console.log(response);
		    		loadApplicationsQueue();
		    	});
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		}

		function loadApplicationsQueue(){
			console.log("called load applications queue");
			var reviewerId = $rootScope.currentUser._id;
			console.log(reviewerId);
			ReviewsService.getPendingReviewsWithReviewerIdAsync(reviewerId).then(function(response) {
				console.log(response.data);
				$scope.pendingReviews = response.data;
			});
			/*
			$http.get('/projectsApi/projects?reviewerId=' + reviewerId).success(function(projects) {
				$scope.projects = projects;
			});*/
		}

	}
})();