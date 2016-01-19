(function() {
	'use strict'

	angular.module('app').controller('Users', Users);

	function Users($scope, $http, $uibModal, $log, $rootScope, UserRegistrationFactory) {
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
			$http.delete('/usersApi/users/' + id).success(function(response) {
				refreshUsers();
			});
		}

		function refreshUsers() {
			$http.get('usersApi/users').success(function(response) {
				$scope.users = response;
			});
		}
	}
})();