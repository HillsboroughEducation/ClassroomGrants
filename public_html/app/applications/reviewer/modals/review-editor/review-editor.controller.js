(function() {
	'use strict'

	angular.module('app').controller('ReviewEditor', ReviewEditor);

	function ReviewEditor($scope, $http, $rootScope, $uibModalInstance, ApplicationsService, ReviewsService, reviewData) {

		$scope.project = {};
		$scope.projectReview = reviewData;
		$scope.budgetItems = {};
		$scope.steps = ['one', 'two', 'three'];
		$scope.step = 0;

		loadApplicationData();

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
				console.log('hit submit');
				reviewData.completionDate = new Date();
				console.log($scope.projectReview.dateCompleted);
				ReviewsService.updateReviewAsync($scope.projectReview).then(function(response) {
					console.log(response);
					$uibModalInstance.close($scope.project);
				});
			} else {
				$scope.step += 1;
			}
		}

		function loadApplicationData() {
			ApplicationsService.getProjectWithIdAsync(reviewData.projectId).then(function(response) {
				$scope.project = response.data;
				return ApplicationsService.getBudgetItemsForProjectIdAsync($scope.project._id);
			}).then(function(response) {
				$scope.budgetItems = response.data;
			});
		}

	}

 })();