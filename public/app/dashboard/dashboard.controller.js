(function() {
	'use strict';

	angular.module('app').controller('Dashboard', Dashboard);

	function Dashboard($scope, $http) {
		$http.get('rest/users').success(function(response) {
			$scope.users = response;
		});
	}
})();

