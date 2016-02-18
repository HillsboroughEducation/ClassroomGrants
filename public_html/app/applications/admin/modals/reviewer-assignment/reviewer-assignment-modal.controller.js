(function() {
	'use strict';

	angular.module('app').controller('ReviewerAssignment', ReviewerAssignment);

	function ReviewerAssignment($scope, $http, $uibModalInstance, $log, $rootScope, selectedProject, AdminApplicationsModalsService, ApplicationsService, ReviewsService) {

		$scope.selectedReviewer;

		//alert(JSON.stringify(selectedProject));

		$scope.submitForm = function() {
			console.log($scope.selectedReviewer._id);
			console.log(selectedProject);
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
				projectReview.projectId = selectedProject._id;
				return ReviewsService.createNewReviewWithReviewerIdAsync(projectReview);
			}).then(function(response) {
				$uibModalInstance.close();
			});
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss();
		}

		$http.get('/usersApi/users?role=Reviewer').success(function(response) {
			$scope.reviewers = response;
		});
	}
})();
