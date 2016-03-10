(function() {
	'use strict';

	angular.module('app').factory('MailService', MailService);

	function MailService($http) {

		var MailService = {};

		MailService.sendRegistrationConfirmationAsync = function(user) {
			var uri = '/mailerService/sendRegistrationConfirmation';
			return $http.post(uri, {"user":user});
		}

		MailService.inviteUser = function(user, sendInvite) {
			var uri = '/mailerService/inviteUser';
			var requestBody = {
				user: {
					firstName: user.firstName,
					email: user.email,
					role: user.role
				},
				sendInvite:sendInvite
			};

			return $http.post(uri, requestBody);

		}

		return MailService
	}
})();