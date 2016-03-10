(function() {
	'use strict';

	angular.module('app').factory('UsersService', UsersService);

	function UsersService($http, $q) {

		var UsersService = {};

		UsersService.loginUserAsync = function(user) {
			var uri = '/login';
			return $http.post(uri, user);
		}

		UsersService.registerUserAsync = function(user, role, mode) {
			var uri = '/register';
			var requestBody = {"user" : user, "userRole" : role, "mode" : mode};
			return $http.post(uri, requestBody);
		};

		UsersService.checkUsername = function(username) {
			var uri = '/checkUsername';
			var requestBody = {"username":username};
			return $http.post(uri, requestBody);
		}

		UsersService.getUsersAsync = function() {
			var uri = '/usersApi/users';
			return $http.get(uri);
		}

		UsersService.getUserWithIdAsync = function(id) {
			console.log('hit users service');
			var uri = '/usersApi/users/' + id;
			return $http.get(uri);
		}

		UsersService.getUsersWithRoleAsync = function(role) {
			var uri = '/usersApi/users?role=' + role;
			return $http.get(uri);
		};

		UsersService.updateUserAsync = function(user) {
			var uri = '/usersApi/users/' + user._id;
			var requestBody = user;
			return $http.put(uri, requestBody);
		}

		UsersService.deleteUserWithIdAsync = function(id) {
			var uri = '/usersApi/users/' + id;
			return $http.delete(uri);
		}

		UsersService.getSecurityQuestionsFromFile = function() {
			var deferred = $q.defer();
			deferred.resolve("hit function");
			return $http.get('/resources/questions.json');
		}

		UsersService.getSecurityQuestions = function(username) {
			var uri = '/getSecurityQuestions?username=' + username;
			return $http.get(uri);
		}

		UsersService.validateSecurityQuestionAnswer = function(username, answer, number) {
			var uri = '/validateSecurityQuestionAnswer';
			var requestBody = {'username':username, 'answer':answer, 'number':number};
			return $http.post(uri, requestBody);
		}

		UsersService.updatePasswordWithUserId = function(id, password) {
			var uri = '/updatePassword'
			var requestBody = {'userId':id, 'password':password};
			return $http.put(uri, requestBody);
		}

		UsersService.defaultAdminExists = function() {
			var uri = '/checkForDefaultAdmin';
			return $http.get(uri);
		}

		UsersService.createDefaultAdmin = function() {
			var uri = '/createDefaultAdmin';
			var adminAccount = {
				username: 'admin',
				password: 'test',
				firstName: 'Default',
				lastName: 'Admin',
				role: 'Admin'
			}
			return $http.post(uri, adminAccount);
		}

		return UsersService;
	}	
})();