(function() {
	'use strict';

	angular.module('app').controller('ApplicantApplications', ApplicantApplications);

	function ApplicantApplications($scope, $http, $uibModal, $log, $rootScope, $state, ApplicationsService, Notification, SweetAlert) {

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
			$state.go('main.applicant-budget-items', {'project': project});
		}

		$scope.submitForReview = function(project) {

			SweetAlert.swal({
			   title: "Are you sure?",
			   text: "Your will not be able to edit your application any further.",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, submit for review.",
			   cancelButtonText: "No, cancel.",
			   closeOnConfirm: false,
			   closeOnCancel: false }, 
			function(isConfirm){ 
			   if (isConfirm) {
			   	  project.projectStatus = 'Submitted';
					ApplicationsService.updateProjectAsync(project).then(function(response) {
						SweetAlert.swal("Submitted", "Your application was submitted.\nWe will notify you when it goes under review.", "success");
						//Notification({title: 'Submission Confirmed', message: 'Your grant application has been submitted.\nWe will notify you when it begins to undergo review'});
					});
			   } else {
			      SweetAlert.swal("Cancelled", "You may continue editing your application.", "error");
			   }
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