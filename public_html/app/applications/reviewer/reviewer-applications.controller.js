(function() {
	'use strict';

	angular.module('app').controller('ReviewerApplications', ReviewerApplications);

	function ReviewerApplications($scope, $http, $rootScope, $uibModal, $log) {

		$scope.reviewApplication = function(project) {

			$rootScope.project = project;

			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/applications/reviewer/modals/review-editor/review-editor-modal-template.html',
		      controller: 'ReviewEditor',
		      size:'lg'
		    });

		    modalInstance.result.then(function (data) {
		    	//returns data here
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		}

		var reviewerId = $rootScope.currentUser._id;
		console.log(reviewerId);
		$http.get('/projectsApi/projects?reviewerId=' + reviewerId).success(function(projects) {
			$scope.projects = projects;
		});
	}
})();