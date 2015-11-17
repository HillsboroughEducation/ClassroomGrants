(function() {
	'use strict';

	angular.module('app').controller('Project', Project);

	function Project($scope, $http, $state, $rootScope, $stateParams) {

		$scope.updateMode = false;

		if($stateParams.projectId != null) {
			$scope.updateMode = true;
			$http.get('project/' + $stateParams.projectId).success(function(response) {
				$scope.project = response;
			});
		} 

		$scope.updateProject = function(project) {
			$http.put('project/' + project._id, project).success(function(response) {
				console.log(response);
			});
		}

		$scope.submitForm = function(project) {

			if($scope.updateMode){
				$http.put('project/' + project._id, project).success(function(response) {
					console.log("Did Update: " + response);
					$state.go('profile');
				});
			} else {
				$scope.project.userId = $rootScope.currentUser._id;
				$scope.project.projectStatus = "pending";
				console.log($scope.project);
				$http.post('/project', $scope.project).success(function(response) {
					console.log(response);
					//$rootScope.currentProjectId = response._id;
					$state.go('budget', {'projectId':response._id});
				});
			}
			
		};
	}
})();