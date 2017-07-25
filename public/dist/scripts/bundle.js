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
};

DashboardController.$inject = ['$log', '$scope'];
angular.module('dashboard', []);
var dashboardWebtype = {
    templateUrl: './app/components/dashboard/dashboard-webtype/dashboard-webtype.html',
    controller: DashboardWebtypeController,
    bindings: {
        data: '<',
        name: '@name'
    }
}

angular.module('dashboard')
    .component('dashboardWebtype', dashboardWebtype);
function DashboardWebtypeController($log, $scope){
    var ctrl = this;

    console.log(ctrl.name);

    $scope.labelFromKey = function(key) {
        return (key || '').split(/(?=[A-Z])/).join(' ');
    }

    $scope.classNameFromKey = function(key) {
        return (key || '').split(/(?=[A-Z])/).join('-').toLowerCase();
    }

    $scope.round = function(value) {
        return Math.round(value);
    }

    $scope.donutChartValues = (function(list) {
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
    }(ctrl.data.Severities));
}

DashboardWebtypeController.$inject = ['$log', '$scope'];

angular.module('dashboard')
    .controller('DashboardWebtypeController', DashboardWebtypeController);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAucm91dGVzLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC13ZWJ0eXBlL2Rhc2hib2FyZC13ZWJ0eXBlLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC13ZWJ0eXBlL2Rhc2hib2FyZC13ZWJ0eXBlLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgncm9vdCcsIFtcbiAgICAnbmdSb3V0ZScsXG4gICAgJ2Rhc2hib2FyZCdcbl0pIiwiZnVuY3Rpb24gcm91dGVQcm92aWRlcigkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPGRhc2hib2FyZCBpbml0aWFsLWRhdGE9XCIkcmVzb2x2ZS5pbml0aWFsRGF0YVwiPjwvZGFzaGJvYXJkPicsXG4gICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgaW5pdGlhbERhdGE6IGZ1bmN0aW9uKCRodHRwKXtcbiAgICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZGFzaGJvYXJkJ1xuICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3NDYWxsYmFjayhyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgIH1cbiAgICAgIH0pO1xufVxuXG5yb3V0ZVByb3ZpZGVyLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbmZpZyhyb3V0ZVByb3ZpZGVyKTsiLCJcbnZhciBkYXNoYm9hcmQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGluaXRpYWxEYXRhOiAnPCcsXG4gICAgZGF0YTogJzwnLFxuICAgIG9wdGlvbnM6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZCcsIGRhc2hib2FyZCk7IiwiYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZENvbnRyb2xsZXInLCBEYXNoYm9hcmRDb250cm9sbGVyKTtcblxuZnVuY3Rpb24gRGFzaGJvYXJkQ29udHJvbGxlcigkbG9nLCAkc2NvcGUpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufTtcblxuRGFzaGJvYXJkQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJywgJyRzY29wZSddOyIsImFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnLCBbXSk7IiwidmFyIGRhc2hib2FyZFdlYnR5cGUgPSB7XG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtd2VidHlwZS9kYXNoYm9hcmQtd2VidHlwZS5odG1sJyxcbiAgICBjb250cm9sbGVyOiBEYXNoYm9hcmRXZWJ0eXBlQ29udHJvbGxlcixcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBkYXRhOiAnPCcsXG4gICAgICAgIG5hbWU6ICdAbmFtZSdcbiAgICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAgIC5jb21wb25lbnQoJ2Rhc2hib2FyZFdlYnR5cGUnLCBkYXNoYm9hcmRXZWJ0eXBlKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRXZWJ0eXBlQ29udHJvbGxlcigkbG9nLCAkc2NvcGUpe1xuICAgIHZhciBjdHJsID0gdGhpcztcblxuICAgIGNvbnNvbGUubG9nKGN0cmwubmFtZSk7XG5cbiAgICAkc2NvcGUubGFiZWxGcm9tS2V5ID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiAoa2V5IHx8ICcnKS5zcGxpdCgvKD89W0EtWl0pLykuam9pbignICcpO1xuICAgIH1cblxuICAgICRzY29wZS5jbGFzc05hbWVGcm9tS2V5ID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiAoa2V5IHx8ICcnKS5zcGxpdCgvKD89W0EtWl0pLykuam9pbignLScpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLnJvdW5kID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUpO1xuICAgIH1cblxuICAgICRzY29wZS5kb251dENoYXJ0VmFsdWVzID0gKGZ1bmN0aW9uKGxpc3QpIHtcbiAgICAgICAgdmFyIHRvdGFsID0gMDtcbiAgICAgICAgdmFyIHJ1bm5pbmdUb3RhbCA9IDA7XG4gICAgICAgIHZhciBkYXNoT2Zmc2V0ID0gMDtcbiAgICAgICAgdmFyIHBlcmNlbnQgPSAwO1xuICAgICAgICB2YXIgdmFsdWUgPSAwO1xuXG4gICAgICAgIGZvcih2YXIga2V5IGluIGxpc3QpIHtcbiAgICAgICAgdG90YWwgPSB0b3RhbCArIGxpc3Rba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG11c3QgYmUgc29ydGVkIGFzIGhpZ2gsIG1lZGl1bSwgbG93XG4gICAgICAgIGZvcih2YXIga2V5IGluIGxpc3QpIHtcbiAgICAgICAgcGVyY2VudCA9IChsaXN0W2tleV0gLyB0b3RhbCkgKiAxMDBcbiAgICAgICAgZGFzaE9mZnNldCA9IChrZXkudG9Mb3dlckNhc2UoKSA9PSAnaGlnaCcpID8gMjUgOiAxMDAgLSBydW5uaW5nVG90YWwgKyAyNTtcbiAgICAgICAgcnVubmluZ1RvdGFsICs9IE1hdGgucm91bmQocGVyY2VudCk7XG4gICAgICAgIHZhbHVlID0gbGlzdFtrZXldXG4gICAgICAgIGxpc3Rba2V5XSA9IHtcbiAgICAgICAgICAgIGRhc2hPZmZzZXQ6IGRhc2hPZmZzZXQsXG4gICAgICAgICAgICBkYXNoQXJyYXk6IE1hdGgucm91bmQocGVyY2VudCkgKyAnICcgKyAoMTAwIC0gTWF0aC5yb3VuZChwZXJjZW50KSksXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfShjdHJsLmRhdGEuU2V2ZXJpdGllcykpO1xufVxuXG5EYXNoYm9hcmRXZWJ0eXBlQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJywgJyRzY29wZSddO1xuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgICAuY29udHJvbGxlcignRGFzaGJvYXJkV2VidHlwZUNvbnRyb2xsZXInLCBEYXNoYm9hcmRXZWJ0eXBlQ29udHJvbGxlcik7XG4iXX0=
