(function() {
	'use strict';

	angular.module('app').controller('Budget', Budget);

	function Budget($scope, $http, $rootScope, $state, $stateParams) {
		//this is the budget controller
		refresh();

		$scope.addItem = function() {
			$scope.projectItem.projectId = $rootScope.currentProjectId;
			$http.post('/projectItems/item', $scope.projectItem).success(function(response) {
				refresh();
				clearProjectItem();
			});
		};

		$scope.edit = function(id) {
			$http.get('/projectItems/item/' + id).success(function(response) {
				$scope.projectItem = response;
			});
		};

		$scope.update = function() {
			$scope.projectItem.projectId = $rootScope.currentProjectId;
			$http.put('/projectItems/item/' + $scope.projectItem._id, $scope.projectItem).success(function(){
				refresh();
				clearProjectItem();
			});
		};

		$scope.remove = function(id) {
			$http.delete('/projectItems/item/' + id).success(function(response) {
				refresh();
			});
		};

		$scope.clear = function() {
			clearProjectItem();
		}

		$scope.completeApplication = function() {
			$state.go('profile');
		}

		function refresh() {
			$rootScope.currentProjectId = $stateParams.projectId;
			var projectId = $stateParams.projectId;
			$http.get('/projectItems/' + projectId).success(function(response) {
				$scope.projectItems = response;
			});
		}

		function clearProjectItem() {
			$scope.projectItem = {};
		}
	}
})();