(function() {
	'use strict';

	angular.module('app').factory('ChartsService', ChartsService);

	function ChartsService($http) {

		var ChartsService = {};

		ChartsService.getProjectCategoryCounts = function() {
			var uri = 'projectsApi/projectCategories';
			var requestBody = {"chartData": 
			{
				'STEM':0, 
				'Literacy':0, 
				'Arts':0, 
				'Social Studies':0,
				'School Challenge':0,
				'Agriculture':0,
				'Technology':0
			}};
			return $http.post(uri, requestBody);
		}

		return ChartsService
	}
})();