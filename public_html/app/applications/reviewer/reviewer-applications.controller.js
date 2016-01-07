(function() {
	'use strict';

	angular.module('app').controller('ReviewerApplications', ReviewerApplications);

	function ReviewerApplications($scope, $http, $rootScope) {

		var reviewerId = $rootScope.currentUser._id;
		console.log(reviewerId);
		$http.get('/projectsApi/projects?reviewerId=' + reviewerId).success(function(projects) {
			$scope.projects = projects;
		});
	}
})();