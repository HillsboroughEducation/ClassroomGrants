(function() {
	'use strict';

	angular.module('app').controller('NavCtrl', NavCtrl);

	function NavCtrl($scope, $http, $state, $rootScope) {

		$scope.states = ['loggedOut', 'loggedIn'];
		$scope.state = 0;

		$rootScope.$on('loginStateChanged', function(){
			if($rootScope.loggedIn && !$rootScope.appInProgress) {
				$scope.user = $rootScope.currentUser;
				$scope.state = 1;
			} else {
				$scope.state = 0;
			}
		});

		$scope.getNavLayoutState = function() {
			return $scope.states[$scope.state];
		}

		$scope.logout = function() {
			$http.post('/logout')
			.success(function() {
				$scope.currentUser = null;
				$rootScope.currentUser = null;
				$rootScope.loggedIn = false;
				$rootScope.$broadcast('loginStateChanged');
				$state.go('login');
			});
		}
	}
})();