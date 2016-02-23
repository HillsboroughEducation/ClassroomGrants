(function() {
	'use strict';

	angular.module('app').config(config);

	function config($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('login', {
				url:'/login',
				templateUrl:'app/login/login-partial.html',
				params: {'newUser': null},
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
				resolve: { authenticate: authenticateApplicant }
			})
			.state('budget', {
				url:'/budget',
				templateUrl: 'app/budget/budget-partial.html',
				params: {'project':null},
				controller:'Budget',
				resolve: { authenticate: authenticateApplicant }
			})
			.state('admin-dashboard', {
				url:'/dashboards/admin',
				templateUrl:'app/dashboards/admin/admin-dashboard-partial.html',
				controller: 'AdminDashboard',
				resolve: { authenticate: authenticateAdmin }
			})
			.state('reviewer-dashboard', {
				url:'/dashboards/reviewer',
				templateUrl:'app/dashboards/reviewer/reviewer-dashboard-partial.html',
				controller: 'ReviewerDashboard',
				resolve: { authenticate: authenticateReviewer }
			})
			.state('applicant-dashboard', {
				url:'/dashboards/applicant',
				templateUrl:'app/dashboards/applicant/applicant-dashboard-partial.html',
				controller: 'ApplicantDashboard',
				resolve: { authenticate: authenticateApplicant }
			})
			.state('users', {
				url:'/users',
				templateUrl:'app/users/users-partial.html',
				controller: 'Users',
				resolve: { authenticate: authenticateAdmin }
			})
			.state('admin-applications', {
				url:'/applications/admin',
				templateUrl:'app/applications/admin/admin-applications-partial.html',
				controller: 'AdministratorApplications',
				resolve: { authenticate: authenticateAdmin }
			})
			.state('reviewer-applications', {
				url:'/applications/reviewer',
				templateUrl:'app/applications/reviewer/reviewer-applications-partial.html',
				controller: 'ReviewerApplications',
				resolve: { authenticate: authenticateReviewer }
			})
			.state('applicant-applications', {
				url:'/applications/applicant',
				templateUrl:'app/applications/applicant/applicant-applications-partial.html',
				controller: 'ApplicantApplications',
				resolve: { authenticate: authenticateApplicant }
			})
			.state('awards', {
				url:'/awards',
				templateUrl:'app/awards/awards-partial.html',
				controller: 'Awards',
				resolve: { authenticate: authenticateAdmin }
			})
			.state('review-summary', {
				url:'/awards/review-summary',
				templateUrl:'app/awards/review-summary/review-summary-partial.html',
				params: {'project':null},
				controller: 'ReviewSummary',
				resolve: { authenticate: authenticateAdmin }
			});


		function authenticateAdmin($q, $timeout, $http, $state, $rootScope) {
			var deferred = $q.defer();
		    $http.get('/loggedin').success(function(user)
		    {
		        $rootScope.errorMessage = null;
		        // User is Authenticated
		        if ((user !== '0') && (user.role == 'Admin')) {
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

		function authenticateReviewer($q, $timeout, $http, $state, $rootScope) {
			var deferred = $q.defer();
		    $http.get('/loggedin').success(function(user)
		    {
		        $rootScope.errorMessage = null;
		        // User is Authenticated
		        if ((user !== '0') && (user.role == 'Reviewer')) {
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


		function authenticateApplicant($q, $timeout, $http, $state, $rootScope) {
			var deferred = $q.defer();
		    $http.get('/loggedin').success(function(user)
		    {
		        $rootScope.errorMessage = null;
		        // User is Authenticated
		        if ((user !== '0') && (user.role == 'Applicant')) {
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

		function authenticate($q, $timeout, $http, $state, $rootScope) {
			var deferred = $q.defer();

		    $http.get('/loggedin').success(function(user)
		    {
		        $rootScope.errorMessage = null;
		        // User is Authenticated
		        if (user !== '0') {
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