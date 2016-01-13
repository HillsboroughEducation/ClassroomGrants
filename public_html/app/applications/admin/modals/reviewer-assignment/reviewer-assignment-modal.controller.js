(function() {
	'use strict';

	angular.module('app').controller('ReviewerAssignment', ReviewerAssignment);

	function ReviewerAssignment($scope, $http, $uibModalInstance, $log, $rootScope, ReviewerAssignmentFactory) {

		$scope.selectedReviewer;

		$scope.submitForm = function() {
			console.log($scope.selectedReviewer._id);
			ReviewerAssignmentFactory.project.reviewerId = $scope.selectedReviewer._id;
			ReviewerAssignmentFactory.project.projectStatus = "InReview";
			console.log(ReviewerAssignmentFactory.project);
			var project = ReviewerAssignmentFactory.project;
			$http.put('/projectsApi/projects/' + project._id + '/project', project).success(function(response) {
				console.log("Did Update: " + response);
				$uibModalInstance.close('Assigned reviewer to project');
			});
		}

		$http.get('/usersApi/users?role=Reviewer').success(function(response) {
			$scope.reviewers = response;
		});
	}
})();
