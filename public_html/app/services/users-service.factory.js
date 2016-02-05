(function() {
	'use strict';

	angular.module('app').factory('UsersService', UsersService);

	function UsersService($http) {

		var UsersService = {};

		UsersService.registerUserAsync = function(user, role, mode) {
			var uri = '/register';
			var requestBody = {"user" : user, "userRole" : role, "mode" : mode};
			return $http.post(uri, requestBody);
		};

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

		return UsersService;
	}	
})();