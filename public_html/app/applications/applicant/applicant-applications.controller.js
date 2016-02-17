(function() {
	'use strict';

	angular.module('app').controller('ApplicantApplications', ApplicantApplications);

	function ApplicantApplications($scope, $http, $uibModal, $log, $rootScope, $state, ApplicationsService, Notification) {

		loadProjects();

		$scope.selectedRow = null;
		$scope.selectedProject = {};


		$scope.setSelectedRow = function(index, project) {
			if($scope.selectedRow == index) {
				$scope.selectedRow = null;
				$scope.selectedProject = null;
			} else {
				$scope.selectedRow = index;
				setSelectedProject(project);
			}
		}

		function setSelectedProject(project) {
			$scope.selectedProject = project;
		}

		$scope.viewProjectDetails = function(id) {
			$state.go('project', {'projectId':id});
		}

		$scope.viewItems = function(project) {
			$state.go('budget', {'project': project});
		}

		$scope.submitForReview = function(project) {
			project.projectStatus = 'Submitted';
			ApplicationsService.updateProjectAsync(project).then(function(response) {
					Notification.success('Your application has been submitted.\nWe will notify you when it begins to undergo review.');
			});
		}

		$scope.openApplicationEditorModal = function(project, isEditorMode) {

			$rootScope.project = project;

			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/applications/applicant/modals/application-editor/application-editor-modal-template.html',
		      controller: 'ModalApplicationEditor',
		      size:'md',
		      resolve: {
				    editorMode: function () {
				      return isEditorMode;
				    }
  				}
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