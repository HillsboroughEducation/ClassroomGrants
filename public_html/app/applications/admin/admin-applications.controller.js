(function() {
	'use strict';

	angular.module('app').controller('AdministratorApplications', AdministratorApplications);

	function AdministratorApplications($scope, $http, $uibModal, $log, $state, ReviewerAssignmentFactory) {

		loadTableData();

		$scope.sortType = "dateCreated";
		$scope.sortReverse = false;
		$scope.searchProjects = '';

		$scope.viewProjectDetails = function(id) {
			$state.go('project', {'projectId':id});
		}

		$scope.openReviewerAssignmentModal = function(modalSize, project){

			console.log(project);
			ReviewerAssignmentFactory.project = project;
			
			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/applications/admin/modals/reviewer-assignment/reviewer-assignment-modal-template.html',
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

			$http.get('/projectsApi/projects').success(function(projects) {
				$scope.projects = projects;
			});

			$http.get('/projectsApi/projects?status=pending').success(function(projects) {
				$scope.pendingProjects = projects;
				$scope.hasPendingProjects = $scope.pendingProjects.length > 0;
			});

			$http.get('/projectsApi/projects?status=InReview').success(function(projects) {
				$scope.assignedProjects = projects;
				$scope.hasAssignedProjects = $scope.assignedProjects.length > 0;
			});
		}

	}
})();