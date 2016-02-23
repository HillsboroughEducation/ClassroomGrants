(function() {
	'use strict';

	angular.module('app').factory('superCache', superCache);

	function superCache($cacheFactory) {
		return $cacheFactory('super-cache');
	}
})();