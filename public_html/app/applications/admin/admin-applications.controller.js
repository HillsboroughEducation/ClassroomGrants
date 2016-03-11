(function() {
	'use strict';

	angular.module('app').controller('AdministratorApplications', AdministratorApplications);

	function AdministratorApplications($scope, $http, $uibModal, $log, $state, ApplicationsService) {

		loadTableData();

		$scope.sortType = "dateCreated";
		$scope.sortReverse = true;
		$scope.searchProjects = '';
		$scope.selectedRow = null;
		$scope.selectedProject = {};

		$scope.setSelectedRow = function(index, project) {
			if($scope.selectedRow == index) {
				$scope.selectedRow = null;
				$scope.selectedProject = null;
			} else {
				$scope.selectedRow = index;
				setSelectedProject(project);
			}
		}

		function setSelectedProject(project) {
			$scope.selectedProject = project;
		}

		$scope.viewProjectDetails = function(id) {
			$state.go('main.application-details-admin', {'projectId':id});
		}

		$scope.openReviewerAssignmentModal = function(modalSize, project) {

			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/applications/admin/modals/reviewer-assignment/reviewer-assignment-modal-template.html',
		      controller: 'ReviewerAssignment',
			  resolve: {
				    selectedProject: function () {
				      return project;
				    }
  				}
		    });

		    modalInstance.result.then(function (data) {
		    	//returns data here
		    	loadTableData();
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		}

		function loadTableData() {
			ApplicationsService.getProjectsAsync().success(function(response) {
				$scope.projects = response;
			});
		}

	}
})();