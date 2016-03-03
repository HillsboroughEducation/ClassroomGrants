(function() {
	'use strict';

	angular.module('app').controller('Awards', Awards);

	function Awards($scope, $state, ApplicationsService) {

		loadProjects();

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

		$scope.viewSummary = function(project) {
			$state.go('main.review-summary', {"projectId":project._id});
		}

		function setSelectedProject(project) {
			console.log('called set selected project');
			console.log($scope.selectedProject);
			$scope.selectedProject = project;
		}

		function loadProjects() {
			ApplicationsService.getProjectsAwaitingDecisionAsync().then(function(response) {
				$scope.projects = response.data;
			});
		}
	}
	
})();