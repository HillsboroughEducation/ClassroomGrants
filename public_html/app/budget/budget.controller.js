(function() {
	'use strict';

	angular.module('app').controller('Budget', Budget);

	function Budget($scope, $http, $rootScope, $state, $stateParams, ApplicationsService) {
		$scope.project;

		getProjectFromParams();
		refresh();

		$scope.addItem = function() {
			ApplicationsService.addBudgetItemAsync($scope.projectItem, $scope.project._id).success(function(response) {
				clearProjectItem();
				refresh();
			});
		};

		$scope.edit = function(id) {
			ApplicationsService.getBudgetItemWithIdAsync(id).success(function(response) {
				$scope.projectItem = response;
			});
		};

		$scope.update = function() {
			$scope.projectItem.projectId = $scope.project._id;
			ApplicationsService.updateBudgetItemAsync($scope.projectItem).success(function(response) {
				clearProjectItem();
				refresh();
			});
		};

		$scope.remove = function(item) {
			ApplicationsService.deleteBudgetItemWithIdAsync(item._id).success(function(response) {
				refresh();
			});
		};

		$scope.clear = function() {
			clearProjectItem();
		}

		$scope.completeApplication = function() {
			//$rootScope.appInProgress = false;
			//$rootScope.$broadcast('loginStateChanged');
			ApplicationsService.updateProjectAsync($scope.project).success(function(response) {
				console.log(response);
				$state.go('main.applicant-applications');
			});
		}

		function refresh() {
			ApplicationsService.getBudgetItemsForProjectIdAsync($scope.project._id).success(function(response) {
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