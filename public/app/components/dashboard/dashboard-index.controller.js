angular.module('root')
.controller('DashboardController', DashboardController);

function DashboardController($log, $scope) {
  var ctrl = this;
  
  ctrl.data = ctrl.initialData;

  $scope.labelFromKey = function(key) {
    return key.split(/(?=[A-Z])/).join(' ');
  }

  $scope.classNameFromKey = function(key) {
    return key.split(/(?=[A-Z])/).join('-').toLowerCase();
  }

  $scope.round = function(value) {
    return Math.round(value);
  }

  $scope.donutChartValues = function(list) {
    var total = 0;
    var runningTotal = 0;
    var dashOffset = 0;
    var percent = 0;
    var value = 0;

    for(var key in list) {
      total = total + list[key];
    }

    // must be sorted as high, medium, low
    for(var key in list) {
      percent = (list[key] / total) * 100
      dashOffset = (key.toLowerCase() == 'high') ? 25 : 100 - runningTotal + 25;
      runningTotal += Math.round(percent);
      value = list[key]
      list[key] = {
        dashOffset: dashOffset,
        dashArray: Math.round(percent) + ' ' + (100 - Math.round(percent)),
        value: value
      }
    }

    return list;
  }

  $scope.severitiesDarkWeb = $scope.donutChartValues(ctrl.data.DarkWeb.Severities);
  $scope.severitiesClearWeb = $scope.donutChartValues(ctrl.data.ClearWeb.Severities);

  ctrl.$onInit = function() {
  };
};

DashboardController.$inject = ['$log', '$scope'];