(function() {
	'use strict';

	angular.module('app').controller('UserSettings', UserSettings);

	function UserSettings($scope, $state, $stateParams) {
		$scope.changePassword = function() {
			$state.go('main.change-password', {'userId':$stateParams.userId});
		}
	}
})();