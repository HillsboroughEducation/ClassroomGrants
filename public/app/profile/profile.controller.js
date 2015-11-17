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
			console.log(id);
			$state.go('budget', {'projectId':id});
		}

		function loadProjects(){
			$http.get('/projects/' + $rootScope.currentUser._id).success(function(response) {
				console.log(JSON.stringify(response));
				$scope.projects = response;
			});
		}
	}
})();