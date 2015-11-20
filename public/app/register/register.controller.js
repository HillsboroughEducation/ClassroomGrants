(function() {
	'use strict';

	angular.module('app').controller('Register', Register);

	function Register($scope, $http, $state, $rootScope) {

		$scope.register = function(user) {
			console.log(user);
			$http.post("/register", user).then(handleSuccess, handleError);

			function handleSuccess(response) {
				$rootScope.currentUser = response;
				$rootScope.$broadcast('currentUser');
				$state.go('project',{});
			};

			function handleError(error) {
				if(error) {
					$scope.error = true;
					$scope.errorMessage = "An error occurred";
				}
			};
		}
	}
})();