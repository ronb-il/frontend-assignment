
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