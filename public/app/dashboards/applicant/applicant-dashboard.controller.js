(function() {
	'use strict';

	angular.module('app').controller('ApplicantDashboard', ApplicantDashboard);

	function ApplicantDashboard($scope, $http, $rootScope, $state) {

		loadProjects();

		$scope.viewProjectDetails = function(id) {
			$state.go('project', {'projectId':id});
		}

		$scope.viewItems = function(id) {
			$state.go('budget', {'projectId':id});
		}

		function loadProjects(){
			$http.get('/projectsApi/projects/' + $rootScope.currentUser._id + '/user').success(function(response) {
				$scope.projects = response;
			});
		}
	}

})();