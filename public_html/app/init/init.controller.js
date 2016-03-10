(function() {
	'use strict';

	angular.module('app').controller('Initialization', Initialization);

	function Initialization($scope, $state, UsersService) {
		
		checkForDefaultAdmin();

		function checkForDefaultAdmin() {
			UsersService.defaultAdminExists().then(function(response) {
				var adminExists = response.data;
				if(adminExists) {
					alert("Default Admin Account Already Created");
					$state.go('auth.login');
				} else {
					return UsersService.createDefaultAdmin();
				}
			}).then(function(response) {
				console.log(response.data);
				alert('Default Admin Account Created');
				$state.go('auth.login');
			});
		}
		
	}

})();