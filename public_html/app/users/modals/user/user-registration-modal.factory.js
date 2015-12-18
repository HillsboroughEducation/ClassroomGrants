(function() {
	'use strict';

	angular.module('app').factory('UserRegistrationFactory', UserRegistrationFactory);

	function UserRegistrationFactory() {
		var UserRegistrationFactory = {};
		UserRegistrationFactory.inUpdateMode = false;
		UserRegistrationFactory.userData = {};
		return UserRegistrationFactory;
	}

})();