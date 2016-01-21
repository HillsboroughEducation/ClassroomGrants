(function() {
	'use strict';

	angular.module('app').controller('Project', Project);

	function Project($scope, $http, $state, $rootScope, $stateParams) {

		$scope.updateMode = false;
		$scope.project = {};
		$scope.steps = ['one', 'two', 'three'];
		$scope.step = 0;

		$scope.isFirstStep = function() {
			return $scope.step === 0;
		}

		$scope.isLastStep = function() {
			return $scope.step === ($scope.steps.length - 1);
		}

		$scope.isCurrentStep = function(step) {
			return $scope.step === step;
		}

		$scope.setCurrentStep = function(step) {
			$scope.step = step;
		}

		$scope.getCurrentStep = function() {
			return $scope.steps[$scope.step];
		}

		$scope.getNextLabel = function() {
			return ($scope.isLastStep()) ? 'Submit' : 'Next';
		}

		$scope.handlePrevious = function () {
			$scope.step -= ($scope.isFirstStep() ? 0 : 1);
		}

		$scope.handleNext = function() {
			if($scope.isLastStep()) {				
				$scope.project.userId = $rootScope.currentUser._id;
				$scope.project.projectStatus = "Pending";
				$scope.project.dateCreated = new Date();
				$http.post('/projectsApi/projects', $scope.project).success(function(response) {
					$state.go('budget', {'project': response});
				}); 
			} else {
				$scope.step += 1;
			}
		}
	}
})();