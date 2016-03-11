(function() {
	'use strict';

	angular.module('app').factory('UsersService', UsersService);

	function UsersService($http, $q) {

		var UsersService = {};

		UsersService.loginUserAsync = function(user) {
			var uri = '/login';
			return $http.post(uri, user);
		}

		UsersService.tempLoginAsync = function(user) {
			var uri = '/tempLogin';
			return $http.post(uri, user);
		}

		UsersService.registerUserAsync = function(user, role, mode) {
			var uri = '/register';
			var requestBody = {"user" : user, "userRole" : role, "mode" : mode};
			return $http.post(uri, requestBody);
		}

		UsersService.checkUsername = function(username) {
			var uri = '/checkUsername';
			var requestBody = {"username":username};
			return $http.post(uri, requestBody);
		}

		UsersService.checkEmail = function(email) {
			var uri = '/checkEmail';
			var requestBody = {"email":email};
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
			var uri = '/initializeUserAccount';
			var requestBody = {
				user: {
					username: 'admin',
					password: 'test',
					firstName: 'Default',
					lastName: 'Admin',
					role: 'Admin'
				},

				isDefaultAdmin:true
			};

			return $http.post(uri, requestBody);
		}

		UsersService.initializeNewUserAccount = function(user) {
			var uri="/initializeUserAccount";
			var newUser = user;
			console.log(newUser);
			newUser.password = newUser.phone.substr(user.phone.length - 4);
			var requestBody = {
				user: {
					email: newUser.email,
					firstName: newUser.firstName,
					lastName: newUser.lastName,
					role: newUser.role,
					password: newUser.password,
					phone: newUser.phone
				},
				isDefaultAdmin:false
			};

			return $http.post(uri, requestBody);
		}

		/*
		UsersService.validateAccountSetup = function(email, tempPassword) {
			var uri='/validateAccountSetup';
			var requestBody = {
				email:email,
				tempPassword:tempPassword
			};

			return $http.post(uri, requestBody);
		}*/

		/*
		UsersService.completeRegistration = function(user) {
			var uri = '/completeRegistration/' + user._id;
			var requestBody = user;
			return $http.put(uri, requestBody);
		}*/

		return UsersService;
	}	
})();