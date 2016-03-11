(function() {
	'use strict';

	angular.module('app').controller('ApplicantApplications', ApplicantApplications);

	function ApplicantApplications($scope, $http, $uibModal, $log, $rootScope, $state, $stateParams, ApplicationsService, Notification, SweetAlert) {

		loadProjects();

		$scope.selectedRow = null;
		$scope.selectedProject = {};

		if($stateParams.passwordUpdateMessage) {
        	Notification({title: 'Success!', message: 'Your password has been updated'});
        	$stateParams.passwordUpdateMessage = false;
    	}


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
			$state.go('main.application-details', {'projectId':id});
		}

		$scope.viewItems = function(project) {
			if(project.projectStatus == 'Submitted') {
				Notification.error({message:"Budget items cannot be changed after application submission.", positionY:'top', positionX: 'center'});
			} else {
			 	$state.go('main.applicant-budget-items', {'projectId': project._id});
			}
			
		}


		$scope.submitForReview = function(project) {

			if(readyForSubmission(project)) {
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
			} else {
				if(!project.requiredFieldsCompleted && (project.budgetTotal === 0)) {
					Notification.error({message:"You must finish your application and enter budget items before submitting.", positionY:'top', positionX: 'center'});
				} else if(!project.requiredFieldsCompleted) {
					Notification.error({message:"You must fill out all required application information before submitting.", positionY:'top', positionX: 'center'});
				} else if(project.budgetTotal === 0) {
					Notification.error({message:"Please add budget items to your application before submitting.", positionY:'top', positionX: 'center'});
				}
			}
	
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
		    	$scope.selectedRow = null;
		    	$scope.selectedProject = null;
		    	loadProjects();
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		      $scope.selectedRow = null;
		      $scope.selectedProject = null;
		      loadProjects();
		    });
		}

		function loadProjects(){
			ApplicationsService.getProjectsWithUserIdAsync($rootScope.currentUser._id).success(function(response) {
				$scope.projects = response;
			});
		}

		function readyForSubmission(project) {
			return (project.budgetTotal > 0) && project.requiredFieldsCompleted;
		}
	}

})();