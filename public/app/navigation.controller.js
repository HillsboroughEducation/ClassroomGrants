(function() {
	'use strict';

	angular.module('app').controller('NavCtrl', NavCtrl);

	function NavCtrl($scope, $http, $state, $rootScope) {

		$rootScope.$on('currentUser', function(){
			$scope.currentUser = $rootScope.currentUser;
		});

		$scope.logout = function() {
			$http.post('/logout')
			.success(function() {
				$scope.currentUser = null;
				$rootScope.currentUser = null;
				$state.go('login');
			});
		}
	}
})();