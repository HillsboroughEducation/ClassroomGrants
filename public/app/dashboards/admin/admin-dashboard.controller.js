(function() {
	'use strict';

	angular.module('app').controller('AdminDashboard', AdminDashboard);

	function AdminDashboard($scope, $http, $uibModal, $log) {

		refreshUsers()

		

		$scope.addUser = function(size) {
			console.log("adding user");
			    var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'app/dashboards/admin/modals/user/user-registration-modal-template.html',
		      controller: 'ModalRegister',
		      size: size,
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });

		    modalInstance.result.then(function (data) {
		    	//returns data here
		    	refreshUsers();
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		};

		function refreshUsers() {
			$http.get('rest/users').success(function(response) {
				$scope.users = response;
			});
		}
	}
})();

