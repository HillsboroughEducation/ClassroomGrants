(function() {
	'use strict';

	angular.module('app').controller('AdministratorApplications', AdministratorApplications);

	function AdministratorApplications($scope, $http, $uibModal, $log, $state, AdminApplicationsModalsService, ApplicationsService) {

		loadTableData();

		$scope.sortType = "dateCreated";
		$scope.sortReverse = true;
		$scope.searchProjects = '';
		$scope.selectedRow = null;
		$scope.selectedProject = {};

		$scope.list = {};
		$scope.config = {
			itemsPerpage: 5,
			fillLastPage:true
		};


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

		$scope.openDetails = function() {
			$scope.openApplicationDetailsModal($scope.selectedProject);
		}
		
		$scope.openApplicationDetailsModal = function(project) {

			AdminApplicationsModalsService.project = project;

			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/applications/admin/modals/application-details/application-detail-modal-template.html',
		      controller: 'ApplicationDetail',
		      size:'md'
		    });

		    modalInstance.result.then(function (data) {
		    	//returns data here
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		}

		$scope.openReviewerAssignmentModal = function(modalSize) {

			AdminApplicationsModalsService.project = $scope.selectedProject;
			
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
			ApplicationsService.getProjectsAwaitingAllReviewsAsync().success(function(response) {
				$scope.projects = response;
			});
		}

	}
})();