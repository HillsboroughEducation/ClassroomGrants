(function() {
	'use strict';

	angular.module('app').factory('ApplicationsService', ApplicationsService);

	function ApplicationsService($http) {
		var ApplicationsService = {};

		ApplicationsService.saveNewProjectAsync = function(project) {
			var uri = '/projectsApi/project';
			return $http.post(uri, project); 
		};

		ApplicationsService.updateProject = function(project) {
			var uri = '/projectsApi/project';
			var requestBody = {"project":project};
			return $http.put(uri, requestBody);
		}

		ApplicationsService.getProjectWithId = function(projectId) {
			var uri = '/projectsApi/project?projectId=' + projectId;
			return $http.get(uri);
		}

		ApplicationsService.getProjects = function() {
			var uri = '/projectsApi/projects';
			return $http.get(uri);
		}

		ApplicationsService.getProjectsWithUserId = function(userId) {
			var uri = '/projectsApi/projects?userId=' + userId;
			return $http.get(uri);
		}

		ApplicationsService.getBudgetItemsForProjectId = function(projectId) {
			var uri = '/projectItemsApi/budgetItems/' + projectId;
			return $http.get(uri);
		};

		ApplicationsService.addBudgetItemAsync = function(item, projectId) {
			var uri = '/projectItemsApi/budgetItem';
			item.projectId = projectId;
			return $http.post(uri, item);
		};

		ApplicationsService.getBudgetItemWithIdAsync = function(id) {
			var uri = '/projectItemsApi/budgetItem?id=' + id;
			return $http.get(uri);
		};

		ApplicationsService.updateBudgetItem = function(item) {
			var uri = '/projectItemsApi/budgetItem';
			var requestBody = {"budgetItem":item};
			return $http.put(uri, requestBody);
		};

		ApplicationsService.deleteBudgetItemWithId = function(id) {
			var uri = '/projectItemsApi/budgetItem?id=' + id;
			return $http.delete(uri);
		};

		return ApplicationsService;
	}

})();