(function() {
	'use strict';

	angular.module('app').controller('ReviewerDashboard', ReviewerDashboard);

	function ReviewerDashboard($scope, $stateParams, Notification) {

		if($stateParams.passwordUpdateMessage) {
        	Notification({title: 'Success!', message: 'Your password has been updated'});
        	$stateParams.passwordUpdateMessage = false;
    	}

	}
})();