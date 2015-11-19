(function() {
	'use strict';

	angular.module('app').config(config);

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/register');

		$stateProvider
			.state('login', {
				url:'/login',
				templateUrl:'app/login/login-partial.html',
				controller:'Login',
			})
			.state('register', {
				url:'/register',
				templateUrl:'app/register/register-partial.html',
				controller:'Register'
			})
			.state('project', {
				url:'/project',
				templateUrl: 'app/project/project-partial.html',
				params: {'projectId':null},
				controller:'Project',
				resolve: { authenticate: authenticate }
			})
			.state('budget', {
				url:'/budget',
				templateUrl: 'app/budget/budget-partial.html',
				params: {'projectId':null},
				controller:'Budget',
				resolve: { authenticate: authenticate }
			})
			.state('profile', {
				url:'/profile',
				templateUrl:'app/profile/profile-partial.html',
				controller:'Profile',
				resolve: { authenticate: authenticate }
			})
			.state('dashboard', {
				url:'/dashboard',
				templateUrl:'app/dashboard/dashboard-partial.html',
				controller: 'Dashboard',
				resolve: { authenticate: authenticate }
			});

		function authenticate($q, $timeout, $http, $state, $rootScope) {
			var deferred = $q.defer();

		    $http.get('/loggedin').success(function(user)
		    {
		        $rootScope.errorMessage = null;
		        // User is Authenticated
		        if (user !== '0') {
		        	$rootScope.loggedIn = true;
		        	console.log(user);
		        	$rootScope.currentUser = user;
		        	deferred.resolve();
		        }
		           
		        // User is Not Authenticated
		        else
		        {    
		            deferred.reject();
		            $state.go('login');
		        }
		    });
		    
    		return deferred.promise;
		}
		
	}
})();