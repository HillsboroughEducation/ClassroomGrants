(function() {
	'use strict';

	angular.module('app').factory('ApplicationsService', ApplicationsService);

	function ApplicationsService($http) {
		var ApplicationsService = {};

		ApplicationsService.saveNewProjectAsync = function(project) {
			var uri = '/projectsApi/project';
			return $http.post(uri, project); 
		};

		ApplicationsService.updateProjectAsync = function(project) {
			var uri = '/projectsApi/project';
			var requestBody = {"project":project};
			return $http.put(uri, requestBody);
		}

		ApplicationsService.getProjectWithIdAsync = function(projectId) {
			var uri = '/projectsApi/project?projectId=' + projectId;
			return $http.get(uri);
		}

		ApplicationsService.getProjectsAsync = function() {
			var uri = '/projectsApi/projects';
			return $http.get(uri);
		}

		ApplicationsService.getProjectsAwaitingAllReviewsAsync = function() {
			var uri = '/projectsApi/projects?state=inReviewProcess';
			return $http.get(uri);
		}

		ApplicationsService.getProjectsAwaitingDecisionAsync = function() {
			var uri = '/projectsApi/projects?state=awaitingDecision';
			return $http.get(uri);
		}

		ApplicationsService.getProjectsWithUserIdAsync = function(userId) {
			var uri = '/projectsApi/projects?userId=' + userId;
			return $http.get(uri);
		}

		ApplicationsService.getBudgetItemsForProjectIdAsync = function(projectId) {
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

		ApplicationsService.updateBudgetItemAsync = function(item) {
			var uri = '/projectItemsApi/budgetItem';
			var requestBody = {"budgetItem":item};
			return $http.put(uri, requestBody);
		};

		ApplicationsService.deleteBudgetItemWithIdAsync = function(id) {
			var uri = '/projectItemsApi/budgetItem?id=' + id;
			return $http.delete(uri);
		};

		return ApplicationsService;
	}

})();