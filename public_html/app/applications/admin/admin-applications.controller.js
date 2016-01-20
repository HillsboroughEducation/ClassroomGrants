(function() {
	'use strict';

	angular.module('app').controller('AdministratorApplications', AdministratorApplications);

	function AdministratorApplications($scope, $http, $uibModal, $log, $state, AdminApplicationsModalsService) {

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


		$scope.setSelectedRow = function(index) {
			if($scope.selectedRow == index) {
				$scope.selectedRow = null;
				$scope.selectedProject = null;
			} else {
				$scope.selectedRow = index;
				setSelectedProject(index);
			}
		}

		function setSelectedProject(index) {
			$scope.selectedProject = $scope.projects[index];
		}

		$scope.openDetails = function() {
			$scope.openApplicationDetailsModal($scope.projects[$scope.selectedRow]);
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

			$http.get('/projectsApi/projects').success(function(projects) {
				$scope.projects = projects;
			});

			/*
			$http.get('/projectsApi/projects?status=Pending').success(function(projects) {
				$scope.pendingProjects = projects;
				$scope.list = projects;
				$scope.hasPendingProjects = $scope.pendingProjects.length > 0;
			});

			$http.get('/projectsApi/projects?status=In%20Review').success(function(projects) {
				$scope.assignedProjects = projects;
				console.log($scope.assignedProjects);
				$scope.hasAssignedProjects = $scope.assignedProjects.length > 0;
			});*/
		}

	}
})();