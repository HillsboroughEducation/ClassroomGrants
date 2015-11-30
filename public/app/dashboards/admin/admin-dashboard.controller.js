(function() {
	'use strict';

	angular.module('app').controller('AdminDashboard', AdminDashboard);

	function AdminDashboard($scope, $http) {
		$http.get('rest/users').success(function(response) {
			$scope.users = response;
		});
	}
})();

