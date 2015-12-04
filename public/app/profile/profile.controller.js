(function() {
	'use strict';

	angular.module('app').controller('Profile', Profile);

	function Profile($scope, $http, $rootScope, $state) {
		//profile controller
		loadProjects();

		$scope.viewProjectDetails = function(id) {
			$state.go('project', {'projectId':id});
		}

		$scope.viewItems = function(id) {
			$state.go('budget', {'projectId':id});
		}

		function loadProjects(){
			$http.get('/projects/' + $rootScope.currentUser._id + '/user').success(function(response) {
				$scope.projects = response;
			});
		}
	}
})();