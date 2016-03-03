(function() {
	'use strict';

	angular.module('app').controller('ApplicationHistory', ApplicationHistory);

	function ApplicationHistory($scope, $state, ApplicationsService) {

		loadTableData();

		$scope.sortType = "dateCreated";
		$scope.sortReverse = true;
		$scope.searchProjects = '';
		$scope.selectedRow = null;
		$scope.selectedProject = {};

		$scope.viewProjectDetails = function(id) {
			$state.go('main.application-details-admin', {'projectId':id});
		}
		

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

		function loadTableData() {
			ApplicationsService.getAllResolvedProjects().then(function(response) {
				console.log(response.data);
				$scope.projects = response.data;
			});
		}
	}
})();