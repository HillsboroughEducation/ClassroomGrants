(function() {
	'use strict';

	angular.module('app').controller('InfoUpdate', InfoUpdate);

	function InfoUpdate($scope, $state, $stateParams, usSpinnerService, Notification, UsersService) {
		loadUserData();

		$scope.updateInfo = function(user) {
			console.log(user);
			UsersService.updateUserInfoAsync(user).then(function(response) {
				console.log(response);
				if($scope.user.role == "Admin") {
						$state.go('main.admin-dashboard', {'infoUpdateMessage':true});
					} else if($scope.user.role == 'Reviewer') {
						$state.go('main.reviewer-applications', {'infoUpdateMessage':true});
					} else if($scope.user.role == 'Applicant') {
						$state.go('main.applicant-applications', {'infoUpdateMessage':true});
					}
			});
		}

		function loadUserData() {	
			UsersService.getUserWithIdAsync($stateParams.userId).then(function(response) {
				console.log(response.data);
				$scope.user = response.data;
			});
		}
	}

})();