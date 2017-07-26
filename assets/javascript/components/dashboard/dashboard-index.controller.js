angular.module('root')
.controller('DashboardController', DashboardController);

function DashboardController($log, $scope) {
  var ctrl = this;
};

DashboardController.$inject = ['$log', '$scope'];