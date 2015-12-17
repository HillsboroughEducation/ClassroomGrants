(function() {
	'use strict';

	angular.module('app').controller('NavCtrl', NavCtrl);

	function NavCtrl($scope, $http, $q, $state, $rootScope, $location) {

		$scope.states = ['loggedOut', 'loggedIn'];
		$scope.state = 0;


	

		//Handles layout
		setStateOnLoad();

		

		$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams) {
			if($location.path() == '/login' || $location.path() == '/register') {
				$scope.state = 0;
			} 
		});

		$rootScope.$on('loginStateChanged', function(){
			if($rootScope.loggedIn && !$rootScope.appInProgress) {
				$scope.user = $rootScope.currentUser;
				$scope.state = 1;
				setNavigationStatesAndPaths();
			} else {
				$scope.state = 0;
			}
		});

		$scope.getNavLayoutState = function() {
			return $scope.states[$scope.state];
		}

		$scope.isActive = function (viewLocation) { 
        	return viewLocation === $location.path();
    	};

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

		function setStateOnLoad() {
			var deferred = $q.defer();
			$http.get('/loggedin').success(function(user) {
		        // User is Authenticated
		        if (user !== '0' && $location.path() != '/login'
		        	&& $location.path() != '/register') {
		        	$rootScope.currentUser = user;
		        	$scope.state = 1;
		        	deferred.resolve();
		        }
		        else
		        {    
		            deferred.reject();
		            $scope.state = 0;
		        }
			});
		}

		function setNavigationStatesAndPaths() {
			if($scope.user.role == 'Admin') {
				$scope.dashboardPath = '/dashboards/admin';
				$scope.applicationsPath = 'applications/admin';
				$scope.isAdmin = true;
			}
			if($scope.user.role == 'Reviewer') {
				$scope.dashboardPath = '/dashboards/reviewer';
				$scope.isAdmin = false;
			}
			if($scope.user.role == 'Applicant') {
				$scope.dashboardPath = '/dashboards/applicant';
				$scope.applicationsPath = 'applications/applicant';
				$scope.isAdmin = false;
			}
			
		
		}
	}
})();