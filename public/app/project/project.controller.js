(function() {
	'use strict';

	angular.module('app').controller('Project', Project);

	function Project($scope, $http, $state, $rootScope, $stateParams) {

		$scope.updateMode = false;

		if($stateParams.projectId != null) {
			$scope.updateMode = true;
			$http.get('api/projects/' + $stateParams.projectId + '/project').success(function(response) {
				$scope.project = response;
			});
		} 

		$scope.updateProject = function(project) {
			$http.put('api/projects/' + project._id + '/project', project).success(function(response) {
				console.log(response);
			});
		}

		$scope.submitForm = function(project) {

			if($scope.updateMode){
				$http.put('api/projects/' + project._id + '/project', project).success(function(response) {
					console.log("Did Update: " + response);
					$state.go('profile');
				});
			} else {
				$scope.project.userId = $rootScope.currentUser._id;
				$scope.project.projectStatus = "pending";
				$scope.project.dateCreated = new Date();
				console.log($scope.project);
				$http.post('/api/projects', $scope.project).success(function(response) {
					$state.go('budget', {'projectId':response._id});
				});
			}
			
		};
	}
})();