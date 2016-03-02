(function() {
	'use strict';

	angular.module('app').controller('AdminDashboard', AdminDashboard);

	function AdminDashboard($scope, $http, $uibModal, $log, $rootScope, ChartsService) {
		ChartsService.getProjectCategoryCounts().then(function(response) {
			//console.log(response);
		});
    
    ChartsService.getProjectStatusCounts().then(function(response) {
      //console.log(response);
    });
	}
// add charts in dashboard
angular.module("app").controller("LineCtrl", function ($scope) {

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
});


angular.module("app").controller("PieCtrl", function ($scope, ChartsService) {
  ChartsService.getProjectStatusCounts().then(function(response) {

    console.log(response.data);
    $scope.labels = Object.keys(response.data);
    $scope.data = Object.keys(response.data).map(function(k){return response.data[k]});

    //$scope.data = Object.keys(response.data).map(function(k){return dataObject[k]});
  });
  
  $scope.labels = ["Completed", "In Progress", "Not Started"];
  $scope.data = [165, 41, 78];
});

angular.module("app").controller("BarCtrl", function ($scope) {
  $scope.labels = ['2014','2015','2016'];
  $scope.series = ['Number of Applications', 'Number of STEM Applications','Number of Art Applications'];

  $scope.data = [
    [100,120,155],
    [75,60,115],
    [25,60,40]

  ];
});


})();

