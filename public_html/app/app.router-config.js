(function() {
	'use strict';

	angular.module('app').config(config);

	function config($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise('/auth/login');

		$stateProvider
			.state('auth', {
				abstract: true,
				url: '/auth',
				templateUrl: 'app/layouts/authentication-layout-template.html'
			})
			.state('auth.init', {
				url: '/init',
				templateUrl: 'app/init/init-partial.html',
				controller: 'Initialization'
			})
			.state('auth.account-setup', {
				url: '/account-setup',
				templateUrl: 'app/account-setup/account-setup-partial.html',
				controller: 'AccountSetup'
			})
			.state('auth.login', {
				url: '/login',
				templateUrl: 'app/login/login-partial.html',
				params: {'newUser': null, 'passwordUpdateMessage':false},
				controller: 'Login'
			})
			.state('auth.recover-password', {
				url: '/login/recover-password',
				templateUrl: 'app/login/password-recovery/password-recovery-partial.html',
				controller: 'PasswordRecovery'
			})
			.state('auth.register', {
				url: '/register',
				templateUrl:'app/register/register-partial.html',
				controller:'Register',
				params: {'completeRegistrationMessage':false}
			});

		$stateProvider
			.state('main', {
				abstract: true,
				url: '/home',
				templateUrl: 'app/layouts/main-layout-template.html',
				controller: 'NavCtrl'
			})
			.state('main.admin-dashboard', {
				url:'/admin-dashboard',
				templateUrl:'app/dashboards/admin/admin-dashboard-partial.html',
				controller: 'AdminDashboard',
				params: {'passwordUpdateMessage':false},
				resolve: { authenticate: authenticateAdmin }
			})
			.state('main.users', {
				url:'/users',
				templateUrl: 'app/users/users-partial.html',
				controller: 'Users',
				resolve: { authenticate: authenticateAdmin }
			})
			.state('main.user-settings', {
				url:'/user/settings/:userId',
				templateUrl: 'app/user-settings/user-settings-partial.html',
				controller: 'UserSettings',
				resolve: {authenticate: authenticate}
			})
			.state('main.change-password', {
				url:'/user/settings/password-update/:userId',
				templateUrl: 'app/user-settings/password/password-change-partial.html',
				controller: 'PasswordChange',
				resolve: {authenticate: authenticate}
			})
			.state('main.admin-applications', {
				url:'/admin-applications',
				templateUrl:'app/applications/admin/admin-applications-partial.html',
				controller: 'AdministratorApplications',
				resolve: { authenticate: authenticateAdmin }
			})
			.state('main.awards', {
				url:'/awards',
				templateUrl:'app/awards/awards-partial.html',
				controller: 'Awards',
				resolve: { authenticate: authenticateAdmin }
			})
			.state('main.history', {
				url:'/history',
				templateUrl: 'app/history/applications-history-partial.html',
				controller: 'ApplicationHistory',
				resolve: { authenticate: authenticateAdmin }
			})
			.state('main.review-summary', {
				url:'/awards/review-summary/:projectId',
				templateUrl:'app/awards/review-summary/review-summary-partial.html',
				controller: 'ReviewSummary',
				resolve: { authenticate: authenticateAdmin }
			})
			.state('main.reviewer-dashboard', {
				url:'/reviewer-dashboard',
				templateUrl:'app/dashboards/reviewer/reviewer-dashboard-partial.html',
				controller: 'ReviewerDashboard',
				params: {'passwordUpdateMessage':false},
				resolve: { authenticate: authenticateReviewer }
			})
			.state('main.reviewer-applications', {
				url:'/reviewer-applications',
				templateUrl:'app/applications/reviewer/reviewer-applications-partial.html',
				controller: 'ReviewerApplications',
				resolve: { authenticate: authenticateReviewer }
			})
			.state('main.applicant-applications', {
				url:'/applicant-applications',
				templateUrl:'app/applications/applicant/applicant-applications-partial.html',
				controller: 'ApplicantApplications',
				params: {'passwordUpdateMessage':false},
				resolve: { authenticate: authenticateApplicant }
			})
			.state('main.application-details-applicant', {
				url:'/applicant-applications/details/:projectId',
				templateUrl:'app/applications/applicant/application-detail/application-detail-partial.html',
				controller: 'ApplicationDetail',
				resolve: {authenticate: authenticateApplicant }
			})
			.state('main.application-details-admin', {
				url: '/admin-applications/details/:projectId', 
				templateUrl:'app/applications/admin/application-detail/application-detail-partial.html',
				controller: 'AdminApplicationDetail',
				resolve: {authenticate: authenticateAdmin}
			})
			.state('main.applicant-budget-items', {
				url:'/applicant/budgetItems/:projectId',
				templateUrl: 'app/applications/applicant/budget/budget-partial.html',
				//params: {'project':null},
				controller:'Budget',
				resolve: { authenticate: authenticateApplicant }
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
		            $state.go('auth.login');
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
		            $state.go('auth.login');
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
		            $state.go('auth.login');
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
		            $state.go('auth.login');
		        }
		    });
		    
    		return deferred.promise;
		}
	}
})();