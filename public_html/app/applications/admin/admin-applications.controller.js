(function() {
	'use strict';

	angular.module('app').controller('AdministratorApplications', AdministratorApplications);

	function AdministratorApplications($scope, $http, $uibModal, $log, ReviewerAssignmentFactory) {

		loadTableData();

		$http.get('/projectsApi/projects?status=InReview').success(function(projects) {
			console.log(projects);
		});

		$scope.openReviewerAssignmentModal = function(modalSize, project){

			console.log(project);
			ReviewerAssignmentFactory.project = project;
			
			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/applications/admin/modals/reviewer-assignment-modal-template.html',
		      controller: 'ReviewerAssignment'
		      
		    });

		    modalInstance.result.then(function (data) {
		    	//returns data here
		    	loadTableData();
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		}

		function loadTableData() {
			$http.get('/projectsApi/projects?status=pending').success(function(projects) {
				console.log(projects);
				$scope.pendingProjects = projects;
			});

			$http.get('/projectsApi/projects?status=InReview').success(function(projects) {
				console.log(projects);
				$scope.assignedProjects = projects;
			});
		}

	}
})();