(function() {
	'use strict';

	angular.module('app').controller('Login', Login);

	function Login($scope, $rootScope, $http, $log, $state) {

		$scope.login = function(user) {
			$http.post('/login', user)
			.then(handleSuccess, handleError);

			function handleSuccess(response) {
				$log.debug(response);
				$rootScope.currentUser = response;
				$state.go('profile');
			};

			function handleError(error) {
				if(error){
					$scope.error = true;
					$scope.errorMessage = "Invalid Credentials";
				}
			};
		}
	}
})();