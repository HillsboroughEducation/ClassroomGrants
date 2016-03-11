(function() {
	'use strict';

	angular.module('app').controller('AccountSetup', AccountSetup);

	function AccountSetup($scope, $state, $rootScope, UsersService, Notification) {

		$scope.setupAccount = function(user) {
			UsersService.tempLoginAsync(user).then(function(response) {
				console.log(response.data);
				$rootScope.currentUser = response.data;
				$state.go('auth.register', {'completeRegistrationMessage':true});
			});
		}
	}

})();