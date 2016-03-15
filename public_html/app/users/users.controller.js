(function() {
	'use strict'

	angular.module('app').controller('Users', Users);

	function Users($scope, $http, $uibModal, $log, $rootScope, UserRegistrationFactory, usSpinnerService, UsersService) {
		//User Management Controller
		refreshUsers();

		$scope.openUserEditor = function(size, mode, user) {

			if(mode == 'update') {
				UserRegistrationFactory.inUpdateMode = true;
				UserRegistrationFactory.userData = user;
			}

			if(mode == 'create') {
				UserRegistrationFactory.inUpdateMode = false;
			}
	
			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/users/modals/user/user-registration-modal-template.html',
		      controller: 'ModalRegister',
		      size: size
		    });

		    modalInstance.result.then(function (data) {
		    	//returns data here
		    	refreshUsers();
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		};

		$scope.deleteUser = function(id) {
			UsersService.deleteUserWithIdAsync(id).success(function(response) {
				refreshUsers();
			});
		}

		function refreshUsers() {
			usSpinnerService.spin('spinner-1');
			UsersService.getUsersAsync().success(function(response) {
				usSpinnerService.stop('spinner-1');
				$scope.users = response;
			});
		}
	}
})();