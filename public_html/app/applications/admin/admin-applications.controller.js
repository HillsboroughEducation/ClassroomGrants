(function() {
	'use strict';

	angular.module('app').controller('AdministratorApplications', AdministratorApplications);

	function AdministratorApplications($scope, $http) {

		$http.get('/projectsApi/projects').success(function(projects) {
			console.log(projects);
			$scope.projects = projects;
		});
	}
})();