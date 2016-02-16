(function() {
	'use strict';

	angular.module('app').controller('Awards', Awards);

	function Awards($scope, ApplicationsService) {
		//this is a controller
		ApplicationsService.getProjectsAwaitingDecisionAsync().then(function(response) {
			$scope.projects = response.data;
		});
	}
	
})();