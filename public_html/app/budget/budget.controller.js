(function() {
	'use strict';

	angular.module('app').controller('Budget', Budget);

	function Budget($scope, $http, $rootScope, $state, $stateParams, ApplicationsService) {
		//this is the budget controller
		$scope.project;

		getProjectFromParams();
		refresh();

		$scope.addItem = function() {
			$scope.projectItem.projectId = $scope.project._id;
			ApplicationsService.addBudgetItemAsync.success(function(response) {
				clearProjectItem();
				refresh();
			});/*
			$http.post('/projectItemsApi/projectItems/item', $scope.projectItem).success(function(response) {
				clearProjectItem();
				refresh();
			});*/
		};

		$scope.edit = function(id) {
			ApplicationsService.getBudgetItemWithIdAsync(id).success(function(response) {
				$scope.projectItem = response;
			});
			/*
			$http.get('/projectItemsApi/projectItems/item/' + id).success(function(response) {
				$scope.projectItem = response;
			});
*/
		};

		$scope.update = function() {
			$scope.projectItem.projectId = $scope.project._id;
			$http.put('/projectItemsApi/projectItems/item/' + $scope.projectItem._id, $scope.projectItem).success(function(){
				clearProjectItem();
				refresh();
			});
		};

		$scope.remove = function(item) {
			$http.delete('/projectItemsApi/projectItems/item/' + item._id).success(function(response) {
				refresh();
			});
		};

		$scope.clear = function() {
			clearProjectItem();
		}

		$scope.completeApplication = function() {
			$rootScope.appInProgress = false;
			$rootScope.$broadcast('loginStateChanged');
			$http.put('/projectsApi/project', {"project":$scope.project}).success(function(response){
				console.log(response);
				$state.go('applicant-applications');
			});
			
		}

		function refresh() {
			$http.get('/projectItemsApi/projectItems/' + $scope.project._id).success(function(response) {
				$scope.projectItems = response;
				calculateBudgetTotal();
			});

		}

		function getProjectFromParams() {
			if($stateParams.project == null) {
				$state.go('login');
			}
			$scope.project = $stateParams.project;
		}

		function clearProjectItem() {
			$scope.projectItem = {};
		}

		function calculateBudgetTotal() {
			var sum = 0;
			for(var x in $scope.projectItems) {
				sum += $scope.projectItems[x].cost*$scope.projectItems[x].quantity;
				console.log(sum);
			}

			$scope.project.budgetTotal = sum;
		}
	}
})();