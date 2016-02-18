(function() {
	'use strict';

	angular.module('app').factory('MailService', MailService);

	function MailService($http) {

		var MailService = {};

		MailService.sendRegistrationConfirmationAsync = function(user) {
			var uri = '/mailerService/sendRegistrationConfirmation';
			return $http.post(uri, {"user":user});
		}

		return MailService
	}
})();