(function() {
	'use strict';

	angular.module('app').controller('ReviewSummary', ReviewSummary);

	function ReviewSummary($scope, $q, $state, $stateParams, $uibModal, ApplicationsService, ReviewsService, SweetAlert) {
	
		$scope.project = {};
		$scope.reviews = {};
		$scope.budgetItems = {};
		$scope.ratingAverages = {};	

		loadReviewSummaryData($stateParams.projectId);

		$scope.award = function() {
			SweetAlert.swal({
			   title: "Are you sure you want to award this grant?",
			   text: "This action will mark the application status as awarded",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, apply award",
			   cancelButtonText: "No, cancel",
			   closeOnConfirm: false,
			   closeOnCancel: false }, 
			function(isConfirm){ 
			   if (isConfirm) {
			   	  $scope.project.awardDecision = 'Awarded';
			   	  $scope.project.projectStatus = 'Resolved';
			   	  $scope.project.dateResolved = new Date();
			   	  ApplicationsService.updateProjectAsync($scope.project).then(function(response) {
			   	  	SweetAlert.swal("Awarded!", "This application has been marked as awarded.", "success");
			   	  });
			      
			   } else {
			      SweetAlert.swal("Cancelled", "No action has been taken.", "error");
			   }
			});

		}

		$scope.decline = function() {
			SweetAlert.swal({
			   title: "Are you sure you wish to decline this applicant?",
			   text: "This action will mark the application status as declined",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",
			   confirmButtonText: "Yes, deline award",
			   closeOnConfirm: false}, 
			function() { 
				$scope.project.awardDecision = 'Declined';
			   	$scope.project.projectStatus = 'Resolved';
			   	$scope.project.dateResolved = new Date();
			   	ApplicationsService.updateProjectAsync($scope.project).then(function(response) {
			   	   SweetAlert.swal("The application has been declined.");
			   	});
			});
		}

		$scope.seeReview = function(reviews, reviewSection, title) {

			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/awards/review-summary/modals/reviews-modal-template.html',
		      controller: 'Reviews',
		      size:'lg',
		      resolve: {
		      	reviews: function() {
		      		return reviews;
		      	},
		      	section: function() {
		      		return reviewSection;
		      	},
		      	title: function() {
		      		return title;
		      	}
		      }
		    });

		    modalInstance.result.then(function (data) {
		    	//returns data here
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		}

		function loadReviewSummaryData(projectId) {
			ApplicationsService.getProjectWithIdAsync(projectId).then(function(response) {
				$scope.project = response.data;
				return ApplicationsService.getBudgetItemsForProjectIdAsync(projectId);
			}).then(function(response) {
				$scope.budgetItems = response.data;
				return ReviewsService.getReviewsForProjectIdAsync($scope.project._id);
			}).then(function(response) {
				$scope.reviews = response.data;
				return ReviewsService.computeAverageRatingsAsync(response.data);
			}).then(function(ratings) {
				$scope.ratingAverages = ratings;
			});
		}
	}
})();