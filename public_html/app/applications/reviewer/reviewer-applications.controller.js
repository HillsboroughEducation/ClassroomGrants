(function() {
	'use strict';

	angular.module('app').controller('ReviewerApplications', ReviewerApplications);

	function ReviewerApplications($scope, $http, $rootScope, $uibModal, $log) {

		loadApplicationsQueue();

		$scope.reviewApplication = function(project) {

			$rootScope.project = project;

			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/applications/reviewer/modals/review-editor/review-editor-modal-template.html',
		      controller: 'ReviewEditor',
		      size:'lg'
		    });

		    modalInstance.result.then(function (project) {
		    	console.log("Completed modal close");
		    	console.log(project);
		    	project.reviewerId = null;
		    	project.numReviews += 1;
		    	$http.put('/projectsApi/project', {"project":project}).success(function(response) {
					console.log(response);
					loadApplicationsQueue();
				});
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		}

		function loadApplicationsQueue(){
			var reviewerId = $rootScope.currentUser._id;
			console.log(reviewerId);
			$http.get('/projectsApi/projects?reviewerId=' + reviewerId).success(function(projects) {
				$scope.projects = projects;
			});
		}

	}
})();