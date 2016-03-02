(function() {
	'use strict';

	angular.module('app').controller('NavCtrl', NavCtrl);

	function NavCtrl($scope, $http, $q, $state, $rootScope, $location) {

		//Handles setting layout state for user when controller is loaded 
		setStateOnLoad().then(function() {
			$scope.user = $rootScope.currentUser;
			setNavigationStatesAndPaths();
		});

		//Sets navigation states and paths when user logs into app
		$rootScope.$on('loginStateChanged', function(){
			if($rootScope.loggedIn) {
				setNavigationStatesAndPaths();
			}
		});

		//sets class to active for nav elements if href is the current path
		$scope.isActive = function (viewLocation) { 
        	return viewLocation === $location.path();
    	};

    	$scope.displayDashboardTab = function() {
    		return $scope.isAdmin || $scope.isReviewer;
    	}

		$scope.logout = function() {
			$http.post('/logout')
			.success(function() {
				$scope.currentUser = null;
				$rootScope.currentUser = null;
				$rootScope.loggedIn = false;
				$rootScope.$broadcast('loginStateChanged');
				$state.go('auth.login');
			});
		}

		function setStateOnLoad() {
			var deferred = $q.defer();
			$http.get('/loggedin').success(function(user) {
		        // User is Authenticated
		        if (user !== '0' && $location.path() != '/login'
		        	&& $location.path() != '/register') {
		        	$rootScope.currentUser = user;
		        	deferred.resolve();
		        }
		        else
		        {      
		            deferred.reject();
		        }
			});

			return deferred.promise;
		}

		function setNavigationStatesAndPaths() {
			if($scope.user.role == 'Admin') {
				$scope.dashboardPath = '/home/admin-dashboard';
				$scope.applicationsPath = '/home/admin-applications';
				$scope.isAdmin = true;
				$scope.isReviewer = false;
				$scope.isApplicant = false;
			}
			if($scope.user.role == 'Reviewer') {
				$scope.dashboardPath = '/dashboards/reviewer';
				$scope.applicationsPath = '/home/reviewer-applications';
				$scope.isAdmin = false;
				$scope.isReviewer = true;
				$scope.isApplicant = false;
			}
			if($scope.user.role == 'Applicant') {
				$scope.dashboardPath = '/dashboards/applicant';
				$scope.applicationsPath = '/applications/applicant';
				$scope.isAdmin = false;
				$scope.isReviewer = false;
				$scope.isApplicant = true;
			}	
		}
	}
})();