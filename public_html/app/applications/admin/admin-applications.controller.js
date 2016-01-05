(function() {
	'use strict';

	angular.module('app').controller('AdministratorApplications', AdministratorApplications);

	function AdministratorApplications($scope, $http, $uibModal, $log) {

		$http.get('/projectsApi/projects').success(function(projects) {
			console.log(projects);
			$scope.projects = projects;
		});

		$scope.openReviewerAssignmentModal=function(x){
			
			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/applications/admin/modals/reviewer-assignment-modal-template.html',
		      controller: 'ReviewerAssignment'
		      
		    });

		    modalInstance.result.then(function (data) {
		    	//returns data here
		    	
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		}

	}
})();