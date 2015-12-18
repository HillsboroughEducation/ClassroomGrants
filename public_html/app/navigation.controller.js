(function() {
	'use strict';

	angular.module('app').controller('NavCtrl', NavCtrl);

	function NavCtrl($scope, $http, $q, $state, $rootScope, $location) {

		//Manages state of layout for ng-switch directive
		$scope.states = ['loggedOut', 'loggedIn'];
		$scope.state = 0;

		//Handles setting layout state for user when controller is loaded 
		setStateOnLoad().then(function() {
			$scope.user = $rootScope.currentUser;
			setNavigationStatesAndPaths();
		});

		//Handles reset of layout state when url for root is manually entered
		$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams) {
			if($location.path() == '/login' || $location.path() == '/register') {
				$scope.state = 0;
			} 
		});

		//Sets layout state and sets current user when user logs into app
		$rootScope.$on('loginStateChanged', function(){
			if($rootScope.loggedIn && !$rootScope.appInProgress) {
				$scope.user = $rootScope.currentUser;
				$scope.state = 1;
				setNavigationStatesAndPaths();
			} else {
				$scope.state = 0;
			}
		});

		//retreives current state for ng-switch on html body layout 
		$scope.getNavLayoutState = function() {
			return $scope.states[$scope.state];
		}

		//sets class to active for nav elements if href is the current path
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
		            $scope.state = 0;
		            deferred.reject();
		        }
			});

			return deferred.promise;
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