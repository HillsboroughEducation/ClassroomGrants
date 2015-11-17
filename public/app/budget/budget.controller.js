(function() {
	'use strict';

	angular.module('app').controller('Budget', Budget);

	function Budget($scope, $http, $rootScope, $state, $stateParams) {
		//this is the budget controller
		refresh();

		$scope.addItem = function() {
			$scope.projectItem.projectId = $rootScope.currentProjectId;
			console.log($scope.projectItem);
			$http.post('/projectItems/item', $scope.projectItem).success(function(response) {
				console.log(response);
				refresh();
				clearProjectItem();
			});
		};

		$scope.edit = function(id) {
			$http.get('/projectItems/item/' + id).success(function(response) {
				console.log(response);
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
			console.log(id);
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
			// $http.get('/loggedin').success(function(response) {
			// 	console.log(response);
			// 	if(response === '0') {
			// 		$rootScope.errorMessage = 'Session expired, You need to log in.';
			// 	} else {
			// 		$rootScope.currentUser = response;
			// 		$http.get('/projectItems/' + $rootScope.currentProjectId).success(function(response) {
			// 			console.log(response);
			// 			$scope.itemsList = response;
			// 		});
			// 	}
			// });
			$rootScope.currentProjectId = $stateParams.projectId;
			var projectId = $stateParams.projectId;
			$http.get('/projectItems/' + projectId).success(function(response) {
				console.log(response);
				$scope.projectItems = response;
			});
		}

		function clearProjectItem() {
			$scope.projectItem = {};
		}
	}
})();