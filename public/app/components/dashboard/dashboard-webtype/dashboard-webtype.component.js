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