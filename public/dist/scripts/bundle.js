angular.module('root', [
    'ngRoute',
    'dashboard'
])
function routeProvider($routeProvider){
    $routeProvider
      .when('/', {
          template: '<dashboard initial-data="$resolve.initialData"></dashboard>',
          resolve: {
            initialData: function($http){
              return $http({
                method: 'GET',
                url: '/api/dashboard'
              }).then(function successCallback(response) {
                return response.data;
              })
            }            
          }
      });
}

routeProvider.$inject = ['$routeProvider'];

angular.module('root')
  .config(routeProvider);

var dashboard = {
  templateUrl: './app/components/dashboard/dashboard-index.html',
  controller: DashboardController,
  bindings: {
    initialData: '<',
    data: '<',
    options: '<'
  }
};

angular.module('root')
  .component('dashboard', dashboard);
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
angular.module('dashboard', []);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAucm91dGVzLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdyb290JywgW1xuICAgICduZ1JvdXRlJyxcbiAgICAnZGFzaGJvYXJkJ1xuXSkiLCJmdW5jdGlvbiByb3V0ZVByb3ZpZGVyKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy8nLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8ZGFzaGJvYXJkIGluaXRpYWwtZGF0YT1cIiRyZXNvbHZlLmluaXRpYWxEYXRhXCI+PC9kYXNoYm9hcmQ+JyxcbiAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBpbml0aWFsRGF0YTogZnVuY3Rpb24oJGh0dHApe1xuICAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXNoYm9hcmQnXG4gICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gc3VjY2Vzc0NhbGxiYWNrKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgICAgfVxuICAgICAgfSk7XG59XG5cbnJvdXRlUHJvdmlkZXIuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29uZmlnKHJvdXRlUHJvdmlkZXIpOyIsIlxudmFyIGRhc2hib2FyZCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IERhc2hib2FyZENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgaW5pdGlhbERhdGE6ICc8JyxcbiAgICBkYXRhOiAnPCcsXG4gICAgb3B0aW9uczogJzwnXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgnZGFzaGJvYXJkJywgZGFzaGJvYXJkKTsiLCJhbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4uY29udHJvbGxlcignRGFzaGJvYXJkQ29udHJvbGxlcicsIERhc2hib2FyZENvbnRyb2xsZXIpO1xuXG5mdW5jdGlvbiBEYXNoYm9hcmRDb250cm9sbGVyKCRsb2csICRzY29wZSkge1xuICB2YXIgY3RybCA9IHRoaXM7XG4gIFxuICBjdHJsLmRhdGEgPSBjdHJsLmluaXRpYWxEYXRhO1xuXG4gICRzY29wZS5sYWJlbEZyb21LZXkgPSBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4ga2V5LnNwbGl0KC8oPz1bQS1aXSkvKS5qb2luKCcgJyk7XG4gIH1cblxuICAkc2NvcGUuY2xhc3NOYW1lRnJvbUtleSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBrZXkuc3BsaXQoLyg/PVtBLVpdKS8pLmpvaW4oJy0nKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgJHNjb3BlLnJvdW5kID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSk7XG4gIH1cblxuICAkc2NvcGUuZG9udXRDaGFydFZhbHVlcyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgICB2YXIgdG90YWwgPSAwO1xuICAgIHZhciBydW5uaW5nVG90YWwgPSAwO1xuICAgIHZhciBkYXNoT2Zmc2V0ID0gMDtcbiAgICB2YXIgcGVyY2VudCA9IDA7XG4gICAgdmFyIHZhbHVlID0gMDtcblxuICAgIGZvcih2YXIga2V5IGluIGxpc3QpIHtcbiAgICAgIHRvdGFsID0gdG90YWwgKyBsaXN0W2tleV07XG4gICAgfVxuXG4gICAgLy8gbXVzdCBiZSBzb3J0ZWQgYXMgaGlnaCwgbWVkaXVtLCBsb3dcbiAgICBmb3IodmFyIGtleSBpbiBsaXN0KSB7XG4gICAgICBwZXJjZW50ID0gKGxpc3Rba2V5XSAvIHRvdGFsKSAqIDEwMFxuICAgICAgZGFzaE9mZnNldCA9IChrZXkudG9Mb3dlckNhc2UoKSA9PSAnaGlnaCcpID8gMjUgOiAxMDAgLSBydW5uaW5nVG90YWwgKyAyNTtcbiAgICAgIHJ1bm5pbmdUb3RhbCArPSBNYXRoLnJvdW5kKHBlcmNlbnQpO1xuICAgICAgdmFsdWUgPSBsaXN0W2tleV1cbiAgICAgIGxpc3Rba2V5XSA9IHtcbiAgICAgICAgZGFzaE9mZnNldDogZGFzaE9mZnNldCxcbiAgICAgICAgZGFzaEFycmF5OiBNYXRoLnJvdW5kKHBlcmNlbnQpICsgJyAnICsgKDEwMCAtIE1hdGgucm91bmQocGVyY2VudCkpLFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gICRzY29wZS5zZXZlcml0aWVzRGFya1dlYiA9ICRzY29wZS5kb251dENoYXJ0VmFsdWVzKGN0cmwuZGF0YS5EYXJrV2ViLlNldmVyaXRpZXMpO1xuICAkc2NvcGUuc2V2ZXJpdGllc0NsZWFyV2ViID0gJHNjb3BlLmRvbnV0Q2hhcnRWYWx1ZXMoY3RybC5kYXRhLkNsZWFyV2ViLlNldmVyaXRpZXMpO1xuXG4gIGN0cmwuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICB9O1xufTtcblxuRGFzaGJvYXJkQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJywgJyRzY29wZSddOyIsImFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnLCBbXSk7Il19
