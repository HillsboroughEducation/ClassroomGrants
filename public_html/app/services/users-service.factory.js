(function() {
	'use strict';

	angular.module('app').factory('UsersService', UsersService);

	function UsersService($http, $q) {

		var UsersService = {};

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
			//return deferred.promise;
			return $http.get('/resources/questions.json');
			//var uri = '/resources/security-questions.json';
			//return $http.get(uri);
		}

		return UsersService;
	}	
})();