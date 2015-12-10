(function() {
	'use strict';

	angular.module('app').controller('ReviewerDashboard', ReviewerDashboard);

	function ReviewerDashboard($scope, $http) {

		$http.get('/projectsApi/projects').success(function(projects) {
			console.log(projects);
			$scope.projects = projects;
		});
	}
})();