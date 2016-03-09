(function() {
	'use strict';

	angular.module('app').controller('AdminDashboard', AdminDashboard);

	function AdminDashboard($scope, $http, $uibModal, $log, $rootScope, $stateParams, Notification, ChartsService) {
    if($stateParams.passwordUpdateMessage) {
        Notification({title: 'Success!', message: 'Your password has been updated'});
        $stateParams.passwordUpdateMessage = false;
    }
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

});

//added bar chart--data should be in [[],[],[]]
angular.module("app").controller("BarCtrl", function ($scope, ChartsService){
ChartsService.getProjectCategoryCounts().then(function(response){

console.log(response.data);
$scope.labels = Object.keys(response.data);
$scope.series = ['Number of Applications'];
$scope.data = [Object.keys(response.data).map(function(k){return response.data[k]})];

});

});

})();

