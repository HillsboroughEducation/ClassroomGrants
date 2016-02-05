(function() {
	'use strict'

	angular.module('app').controller('ModalApplicationEditor', ModalApplicationEditor);

	function ModalApplicationEditor($scope, $http, $rootScope, $log, $uibModalInstance, ApplicationsService) {
		
		$scope.project = {};
		$scope.steps = ['one', 'two', 'three'];
		$scope.step = 0;

		loadProjectDetails();

		$scope.close = function() {
			$uibModalInstance.dismiss();
		}

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
				console.log("Update now");			
				console.log($scope.project);
				ApplicationsService.updateProjectAsync($scope.project).success(function(response) {
					console.log(response);
					$uibModalInstance.close();
				});
				/*
				$http.put('/projectsApi/project', {"project":$scope.project}).success(function(response) {
					console.log(response);
					$uibModalInstance.close();
				});*/
			} else {
				$scope.step += 1;
			}
		}

		function loadProjectDetails(){
			ApplicationsService.getProjectWithIdAsync($rootScope.project._id).success(function(response) {
				console.log(response);
				$scope.project = response;
			});
			/*
			$http.get('/projectsApi/project?projectId=' + $rootScope.project._id).success(function(response) {
				console.log(response);
				$scope.project = response;
			})*/
		}
	}
})();