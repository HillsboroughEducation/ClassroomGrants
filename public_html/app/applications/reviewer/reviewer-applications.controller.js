(function() {
	'use strict';

	angular.module('app').controller('ReviewerApplications', ReviewerApplications);

	function ReviewerApplications($scope, $http) {
		$http.get('/projectsApi/projects').success(function(projects) {
			$scope.projects = projects;
		});
	}
})();