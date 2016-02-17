(function() {
	'use strict'

	angular.module('app').controller('ReviewEditor', ReviewEditor);

	function ReviewEditor($scope, $http, $rootScope, $uibModalInstance) {

		$scope.project = $rootScope.project;
		$scope.projectReview = {};
		$scope.budgetItems = {};
		$scope.steps = ['one', 'two', 'three'];
		$scope.step = 0;

		getBudgetItems();

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
			console.log("called get current step");
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
				$scope.projectReview.reviewerId = $rootScope.currentUser._id;
				$scope.projectReview.projectId = $scope.project._id;
				$scope.projectReview.dateCompleted = new Date();
				$http.post('/reviewsApi/projectReview', {"review":$scope.projectReview}).success(function(response) {
					console.log(response);
					$uibModalInstance.close($scope.project);
				});
			} else {
				$scope.step += 1;
			}
		}

		function getBudgetItems(){
			$http.get('/projectItemsApi/projectItems/' + $scope.project._id).success(function(response) {
				$scope.budgetItems = response;
				console.log($scope.budgetItems);
			});
		}

	}

 })();