(function() {
	'use strict';

	angular.module('app').controller('ApplicantApplications', ApplicantApplications);

	function ApplicantApplications($scope, $http, $uibModal, $log, $rootScope, $state, ApplicationsService) {

		loadProjects();

		$scope.viewProjectDetails = function(id) {
			$state.go('project', {'projectId':id});
		}

		$scope.viewItems = function(project) {
			$state.go('budget', {'project': project});
		}


		$scope.openApplicationEditorModal = function(project) {

			$rootScope.project = project;

			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/applications/applicant/modals/application-editor/application-editor-modal-template.html',
		      controller: 'ModalApplicationEditor',
		      size:'md'
		    });

		    modalInstance.result.then(function (data) {
		    	loadProjects();
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		      loadProjects();
		    });
		}

		function loadProjects(){
			ApplicationsService.getProjectsWithUserIdAsync($rootScope.currentUser._id).success(function(response) {
				$scope.projects = response;
			});
		}
	}

})();