(function() {
	'use strict'

	angular.module('app').controller('ModalApplicationEditor', ModalApplicationEditor);

	function ModalApplicationEditor($scope, $http, $rootScope, $log, $uibModalInstance, editorMode, ApplicationsService) {
		
		$scope.project = {};
		$scope.steps = ['one', 'two', 'three'];
		$scope.step = 0;

		if(editorMode) loadProjectDetails();

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
			return ($scope.isLastStep()) ? 'Finish' : 'Next';
		}

		$scope.handlePrevious = function () {
			$scope.step -= ($scope.isFirstStep() ? 0 : 1);
		}

		$scope.handleNext = function() {
			if($scope.isLastStep()) {	
				if(editorMode) {
					$scope.project.requiredFieldsCompleted = true;
					ApplicationsService.updateProjectAsync($scope.project).success(function(response) {
						$uibModalInstance.close();
					});
				} else {
					$scope.project.requiredFieldsCompleted = true;
					initializeNewProjectProperties();
					ApplicationsService.saveNewProjectAsync($scope.project).success(function(response) {
						$uibModalInstance.close();
					});
				}
			} else {
				$scope.step += 1;
			}
		}

		$scope.saveAndExit = function() {
			if(editorMode) {
					ApplicationsService.updateProjectAsync($scope.project).success(function(response) {
						$uibModalInstance.close();
					});
			} else {
				$scope.project.requiredFieldsCompleted = false;
				initializeNewProjectProperties();
				ApplicationsService.saveNewProjectAsync($scope.project).success(function(response) {
					$uibModalInstance.close();
				});
			}
		}

		function initializeNewProjectProperties() {
			$scope.project.userId = $rootScope.currentUser._id;
			$scope.project.projectStatus = "Pending";
			$scope.project.numReviews = 0;
			$scope.project.dateCreated = new Date();
			$scope.project.budgetTotal = 0;
		}

		function loadProjectDetails(){
			ApplicationsService.getProjectWithIdAsync($rootScope.project._id).success(function(response) {
				$scope.project = response;
			});
		}
	}
})();