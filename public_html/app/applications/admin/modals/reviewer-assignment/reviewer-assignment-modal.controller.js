(function() {
	'use strict';

	angular.module('app').controller('ReviewerAssignment', ReviewerAssignment);

	function ReviewerAssignment($scope, $http, $uibModalInstance, $log, $rootScope, selectedProject, ApplicationsService, ReviewsService, Notification) {

		$scope.selectedReviewer;

		loadReviewersList();
		loadProjectReviews();

		$scope.submitForm = function() {
			if(($scope.pendingReviews.length + selectedProject.numReviews) >= 3) {
				Notification.error({message:"An application cannot have more than three total reviews.", positionY:'top', positionX: 'center'});
			} else {
				if(selectedProject.projectStatus == "Submitted") {
					selectedProject.projectStatus = "In Review";
				}
				ApplicationsService.updateProjectAsync(selectedProject).then(function(response) {
					var projectReview = {};
					projectReview.projectTitle = selectedProject.projectTitle;
					projectReview.projectCategory = selectedProject.projectCategory;
					projectReview.assignedDate = new Date();
					projectReview.completionDate = null;
					projectReview.reviewerId = $scope.selectedReviewer._id;
					projectReview.reviewerName = $scope.selectedReviewer.fullName;
					projectReview.projectId = selectedProject._id;
					return ReviewsService.createNewReviewWithReviewerIdAsync(projectReview);
				}).then(function(response) {
					$uibModalInstance.close();
				});
			}
		}

		$scope.deleteReview = function(id) {	
			ReviewsService.deleteReviewWithIdAsync(id).then(function(response) {
				console.log(response.data);
				loadProjectReviews();
			});
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss();
		}

		function loadReviewersList() {
			ReviewsService.getReviewersAsync().then(function(response) {
				$scope.reviewers = response.data;
			});
		}

		function loadProjectReviews() {
			ReviewsService.getPendingReviewsWithProjectIdAsync(selectedProject._id).then(function(response) {
				console.log(response.data);
				$scope.pendingReviews = response.data;
			});
		}

	}
})();
