(function() {
	'use strict';

	angular.module('app').controller('ReviewerAssignment', ReviewerAssignment);

	function ReviewerAssignment($scope, $http, $uibModalInstance, $log, $rootScope, AdminApplicationsModalsService) {

		$scope.selectedReviewer;

		$scope.submitForm = function() {
			console.log($scope.selectedReviewer._id);
			AdminApplicationsModalsService.project.reviewerId = $scope.selectedReviewer._id;
			AdminApplicationsModalsService.project.projectStatus = "InReview";
			console.log(AdminApplicationsModalsService.project);
			var project = AdminApplicationsModalsService.project;
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
